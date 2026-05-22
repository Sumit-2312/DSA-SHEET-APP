import { Folders, Question, Sheets } from "@repo/database/db";
import type { Response } from "express";



const deleteAllData = async (folder: any): Promise<number> => {

    if (!folder) return 0;
    // Delete all questions in this folder
    let deletedQuestions = 0;
    // this line will delete all questions in the folder and return the count of deleted questions
    deletedQuestions += (await Question.deleteMany({ folderId: folder._id })).deletedCount;
    //  Recursively delete child folders

    const childFolders = await Folders.find({ parentFolderId: folder._id });

    for (const child of childFolders) {
        deletedQuestions += await deleteAllData(child);
    }
    
    // 4. Delete the folder itself
    await Folders.findByIdAndDelete(folder._id);
    return deletedQuestions;
};


export const removeFolder = async (req: any, res: Response) => {
    const { email } = req.user;

    if (!email) {
        return res.status(401).json({
            success: false,
            error: "Unauthorized",
            redirect: "/login"
        });
    }

    try {
        const { folderId } = req.body;

        if (!folderId) {
            return res.status(400).json({
                success: false,
                error: "FolderId is required"
            });
        }

        const folderFromDb = await Folders.findById(folderId);

        if (!folderFromDb) {
            return res.status(404).json({
                success: false,
                error: "Folder not found"
            });
        }

        const countOfQuestionDeleted = await deleteAllData(folderFromDb);

        // now decrease these many questions from the sheet 
        const sheetFromDb = await Sheets.updateOne(
            {_id : folderFromDb.sheetId},
            {totalQuestions: { $subtract: ["$totalQuestions", countOfQuestionDeleted] }}
        )

        return res.status(200).json({
            success: true,
            message: "Folder and all related data deleted successfully",
            deletedCount: countOfQuestionDeleted
        });

    } catch (error) {
        console.error("Error in removeFolder controller:", error);

        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
};