import { Folders } from "@repo/database/db";
import type { basicResponseType } from "@repo/types/apiResponse/basicResponseType";
import type { updateFolderResponseType } from "@repo/types/apiResponse/updateFolderResponseType";
import type { Response } from "express";

export const updateFolder = async(req:any,res:Response) =>{
    const {email} = req.user;
    if(!email){
        const response: basicResponseType = {
            success: false,
            error: "Unauthorized",
            redirect:"/login"
        }
        return res.status(401).json(response);
    }
    try{
        const {folderId,newName} = req.body;
        if(!folderId || !newName){
            const response: basicResponseType = {
                success: false,
                error: "folderId and newName are required"
            }
            return res.status(400).json(response);
        }

        // update folder name in db 
        const newFolder = await Folders.findOneAndUpdate(
            { _id : folderId},
            { $set: { name : newName } },
        );

        if(!newFolder){
            const response: basicResponseType = {
                success: false,
                error: "Folder not found"
            }
            return res.status(404).json(response);
        }

        // send positoin repsonse to frontend
        const response: updateFolderResponseType = {
            success: true,
            message: "Folder name updated successfully",
        }
        return res.status(200).json(response);

    }   catch(err:any){
        console.log("Error while updating folder name ",err);
        const response: basicResponseType = {
            success: false,
            error: "Internal Server Error"
        }
        return res.status(500).json(response);
    }
    
}