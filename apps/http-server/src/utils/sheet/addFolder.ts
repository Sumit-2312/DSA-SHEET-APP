import { Folders, Users } from "@repo/database/db";
import type { basicResponseType } from "@repo/types/apiResponse/basicResponseType";
import type{addFolderResponseType} from '@repo/types/apiResponse/addFolderResponseType'
import type { Response } from "express";

export const addFolder = async(req:any,res:Response) =>{
    const {email} = req.user;
    if(!email){
        const response:basicResponseType={
            success: false,
            error: "No user found",
            redirect: "/login"
        }
        return res.status(200).json(response);
    }
    try{

        const userFromDb = await Users.findOne({email:email});

        const {name,parentFolderId,sheetId} = req.body;
        if(!name || !parentFolderId || !sheetId){
            const response: basicResponseType = {
                success: false,
                error: "name,parentFolderId,sheetId required",
            }
            return res.status(200).json(response);
        }

        // if parentFolderId is sheetId add the rootFolder 
        if( parentFolderId === sheetId ){
            const newFolder = await Folders.create({
                name: name,
                childFolders: [],
                sheetId: sheetId,
                parentFolderId: null,
                createdBy: userFromDb?.id || null
            })

            const response: addFolderResponseType = {
                success: true,
                message: "Folder added successfully",
                id: newFolder._id.toString(),
                name: newFolder.name,
                sheetId: sheetId,
                parentFolderId: sheetId,
                childFolders:[],
                questions:[],
                createdBy: userFromDb?._id.toString() || ""
            }

            return res.status(200).json(response);

        }


        const parentFolderFromDb = await Folders.findById(parentFolderId);
        if(!parentFolderFromDb ){
            const response: basicResponseType = {
                success: false,
                error: "No such folder exist"
            }
            return res.status(200).json(response);
        }

        const childFoldersOfParentFolder = parentFolderFromDb.childFolders.length
        const order = childFoldersOfParentFolder == 0 ? 1 : childFoldersOfParentFolder;


        const dataForNewFolder = {
            name: name,
            sheetId: sheetId,
            parentFolderId: parentFolderId,
            childFolders: [],
            order: order,
            createdBy: userFromDb?._id ?? null
        }

        const newFolder = await Folders.create(dataForNewFolder)

        const response:addFolderResponseType ={
                success: true,
                message: "Folder added successfully",
                id: newFolder._id.toString(),
                name: newFolder.name,
                sheetId: sheetId,
                parentFolderId: parentFolderId,
                childFolders:[],
                questions:[],
                createdBy: userFromDb?._id.toString() || ""
        }

        return res.status(200).json(response);


    }catch(err){
        console.log("Error while adding new folder: ",err);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        })
    }
}