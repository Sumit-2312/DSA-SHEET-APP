import express, { type Request, type Response } from 'express';
import { JudgeRequest } from '../judge0/JudgeRequest.js';
const Execute =  async (req: Request, res: Response) => {
  try {
    const {
      language_id,
      source_code
     } = req.body;

    // basic validation

    if (!source_code || !language_id) {
      return res.status(400).json({
        success: false,
        message: "language_id and source_code are required",
      });
    }

    const result = await JudgeRequest({...req.body});

    return res.status(200).json(result);

  } catch (error: any) {
    console.error("Execution Error:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Code execution failed",
    });
  }
}
export default Execute;