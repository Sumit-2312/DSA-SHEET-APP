import type { basicResponseType } from "@repo/types/apiResponse/basicResponseType";
import type {FieldsToBeUpdated, updateQuestionRequestType} from "@repo/types/apiRequests/updateQuestionRequestType";
import type { Response } from "express";
import { Question } from "@repo/database/db";

export const updateQuestion = async(req:any,res:Response) =>{
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
        const bodyData :updateQuestionRequestType = req.body;
        if( !bodyData.questionId || !bodyData.sheetId || !bodyData.folderId){
            const response:basicResponseType = {
                success: false,
                error: "Missing required fields"
            }
            return res.status(400).json(response);
        }

        const updatedFields: FieldsToBeUpdated = bodyData.fieldToBeUpdated;

        const updateQuestionFromDb = await Question.findOneAndUpdate(
            {
                _id: bodyData.questionId,
                sheetId: bodyData.sheetId,
                folderId: bodyData.folderId
            },
            {
                ...updatedFields // will only update the fields that are present in the request body, if a field is not present it will not be updated in the database
            },
            { new: true } // return the updated document
        );

        if(!updateQuestionFromDb){
            const response:basicResponseType = {
                success: false,
                error: "Question not found"
            }
            return res.status(404).json(response);
        }

        const response:basicResponseType = {
            success: true,
            message: "Question updated successfully"
        }
        return res.status(200).json(response);

    }catch(error){
        console.error("Error in updateQuestion API:", error);
        const response:basicResponseType = {
            success: false,
            error: "Internal server error"
        }
        return res.status(500).json(response);
    }


}