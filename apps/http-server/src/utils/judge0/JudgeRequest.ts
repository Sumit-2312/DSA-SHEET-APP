import dotenv from "dotenv";
dotenv.config();

import type { Judge0RequestType } from "@repo/types/apiRequests/judge0RequestType";
import type { Judge0ResponseType } from "@repo/types/apiResponse/judge0ResponseTypes";
import axios from "axios";


// encode to base64 from utf-8
export function encodeToBase64(input: string): string {
  return Buffer.from(input, "utf-8").toString("base64");
}
// decode from base64 to utf-8
export function decodeFromBase64(encoded: string): string {
  return Buffer.from(encoded, "base64").toString("utf-8");
}


// Main function
export async function JudgeRequest(
  payload: Judge0RequestType
): Promise<Judge0ResponseType> {
  const JUDGE0_URL = process.env.JUDGE0_URL;

  if (!JUDGE0_URL) {
    throw new Error("JUDGE0_URL is not defined in .env");
  }
  console.log(`Judge Url: ${JUDGE0_URL} `)
  
  console.log(`Request came in judgeRequest Function with body : ${JSON.stringify(payload)}`)
  
  const body: Record<string, any> = {
    language_id: payload.language_id,
    source_code: encodeToBase64(payload.source_code),
  };

  if (payload.stdin !== undefined)
    body.stdin = encodeToBase64(payload.stdin);

  if (payload.expected_output !== undefined)
    body.expected_output = encodeToBase64(payload.expected_output);

  if (payload.cpu_time_limit !== undefined)
    body.cpu_time_limit = payload.cpu_time_limit;

  if (payload.wall_time_limit !== undefined)
    body.wall_time_limit = payload.wall_time_limit;

  if (payload.memory_limit !== undefined)
    body.memory_limit = payload.memory_limit;

  if (payload.stack_limit !== undefined)
    body.stack_limit = payload.stack_limit;

  if (payload.max_processes_and_or_threads !== undefined)
    body.max_processes_and_or_threads = payload.max_processes_and_or_threads;

  if (payload.enable_network !== undefined)
    body.enable_network = payload.enable_network;

  try {


    const response = await axios.post(
      `${JUDGE0_URL}/submissions?base64_encoded=true&wait=true`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`Raw judge0 response : ${JSON.stringify(response.data)}`);

    const data = response.data;

    // decode only fields that are base64 encoded
    const decoded: Judge0ResponseType = {
      ...data,
      stdout: data.stdout ? decodeFromBase64(data.stdout) : null,
      stderr: data.stderr ? decodeFromBase64(data.stderr) : null,
      compile_output: data.compile_output
        ? decodeFromBase64(data.compile_output)
        : null,
      judgemessage : data.message,
      success: true
    };

    console.log(`decoded stdout: ${decoded.stdout}`);

    return decoded;

  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data ||
      error.message;

    throw new Error(`Judge0 API Error: ${JSON.stringify(message)}`);
  }
}