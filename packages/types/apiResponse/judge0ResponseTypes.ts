import type { basicResponseType } from "./basicResponseType.js";

export interface Judge0ResponseType extends basicResponseType {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  judgemessage: string|null;
  time: string | null;
  memory: number | null;
  token: string;
  status: {
    id: number;
    description: string;
  };
}