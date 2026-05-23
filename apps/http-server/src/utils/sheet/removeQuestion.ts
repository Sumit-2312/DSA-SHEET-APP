import { Question } from "@repo/database/db";
import type { Response } from "express";

export const removeQuestion = async(req:any,res:Response) =>{
    try{
        const { questionId, folderId, sheetId } = req.body;
        if(!questionId || !folderId || !sheetId) return res.status(400).json({ success: false, error: "Missing required fields" });

        // remove the question from the questions collection
        const deletedQuestion = await Question.findOneAndDelete({ _id: questionId, folderId, sheetId });
        if (!deletedQuestion) return res.status(404).json({ success: false, error: "Question not found" });

        res.json({ success: true, message: "Question deleted successfully" });
    } catch (error) {
        console.error("Error deleting question:", error);
        res.status(500).json({ success: false, error: "Failed to delete question" });
    }
}