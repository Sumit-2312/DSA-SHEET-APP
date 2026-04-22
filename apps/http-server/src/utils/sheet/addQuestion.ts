import { Folders, Question, Users } from "@repo/database/db";
import type { basicResponseType } from "@repo/types/apiResponse/basicResponseType";
import type {addQuestionResponseType} from "@repo/types/apiResponse/addQuestionResponseType";
import type { Response } from "express";

export const addQuestion = async(req:any,res:Response) =>{
    const {email} = req.user;
    if(!email){
        const response:basicResponseType = {
            success: false,
            error: "User not authenticated",
            redirect: "/login"
        }
        return res.status(401).json(response);
        }
        try{

            const {sheetId,folderId,question}:{
                sheetId: string,
                folderId: string,
                question:{
                    title: string,
                    platform: string,
                    difficulty: "easy"|"medium"|"hard",
                    link: string,
                    resourceLink: string,
                    notes: string,
                    sheetId: string,
                    folderId: string
                }
            } = req.body;
            console.log(`add question api called with sheetId: ${sheetId}, folderId: ${folderId}, question: ${JSON.stringify(question)}`);

            const userFromDb = await Users.findOne({email: email});
            if(!userFromDb){    
                const response:basicResponseType = {
                    success: false,
                    error: "User not found",
                    redirect: "/login"
                }
                return res.status(404).json(response);
            }

            // validate the input
            if(!sheetId || !folderId || !question){
                const response:basicResponseType = {
                    success: false,
                    error: "Missing required fields"
                }
                return res.status(400).json(response);
            }

            const Folder = await Folders.findOne({_id:folderId});

            if(!Folder){
                const response:basicResponseType = {
                    success: false,
                    error: "Folder not found in database"
                }
                return res.status(404).json(response);
            }

            if(Folder.childFolders.length > 0 ){
                const response:basicResponseType = {
                    success: false,
                    error: "Cannot add question to a folder that has child folders"
                }
                return res.status(400).json(response);
            }

            const newQuestion = await Question.create({
                title: question.title,
                difficulty: question.difficulty,
                link: question.link,
                folderId: folderId,
                sheetId: sheetId,
                platform: question.platform,
                resourceLink: question.resourceLink,
                notes: question.notes,
                createdBy: userFromDb._id.toString()
            });

            const response:addQuestionResponseType ={
                success: true,
                id: newQuestion._id.toString(),
                title: newQuestion.title,
                difficulty: newQuestion.difficulty || "easy",
                link: newQuestion.link,
                resourceLink: newQuestion.resourceLink,
                notes: newQuestion.notes,
                sheetId: newQuestion.sheetId.toString(),
                folderId: newQuestion.folderId.toString() ,
                createdBy: newQuestion.createdBy?.toString() || "",
                platform: newQuestion.platform || ""
             }
                return res.status(200).json(response);
        }
        catch(error){
            console.log("Error in addQuestion:", error);
            const response:basicResponseType = {
                success: false,
                error: "Internal Server Error"
            }
            return res.status(500).json(response);
        }
}