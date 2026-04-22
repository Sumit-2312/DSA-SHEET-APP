import { Folders, Question } from "@repo/database/db";
import type { Response } from "express";



const deleteAllData = async (folder: any) => {

    if (!folder) return;

    // Delete all questions in this folder

    await Question.deleteMany({ folderId: folder._id });

    //  Recursively delete child folders

    if (folder.childFolders && folder.childFolders.length > 0) {

        const childFolders = await Folders.find({
            _id: { $in: folder.childFolders }
        });

        for (const child of childFolders) {
            await deleteAllData(child);
        }

    }

    // Remove reference from parent folder

    if (folder.parentFolderId) {

        await Folders.findByIdAndUpdate(

            folder.parentFolderId,

            {
                $pull: { childFolders: folder._id }
            }

        );

    }

    // 4. Delete the folder itself

    await Folders.findByIdAndDelete(folder._id);

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

        await deleteAllData(folderFromDb);

        return res.status(200).json({
            success: true,
            message: "Folder and all related data deleted successfully"
        });

    } catch (error) {
        console.error("Error in removeFolder controller:", error);

        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
};