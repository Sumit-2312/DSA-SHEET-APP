export interface Judge0RequestType {
  language_id: string;
  source_code: string;       // base64 if using encoding ( recommended else emojis will not be considered and code is sent as plain text )
  stdin?: string;            // input for program

  // Execution limits (VERY IMPORTANT)
  cpu_time_limit?: number;   // seconds
  wall_time_limit?: number;  // seconds
  memory_limit?: number;     // KB

  // Advanced controls
  expected_output?: string;  // for judging
  stack_limit?: number;
  max_processes_and_or_threads?: number;
  enable_network?: boolean;
}