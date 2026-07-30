import type { basicResponseType } from "@repo/types/apiResponse/basicResponseType";
import type { AddCustomQuestionRequestType } from "@repo/types/apiRequests/addCustomQuestionRequestType";
import type { Question } from "@repo/types/apiResponse/getSheetDataResponseType";
import { Question as QuestionDB, Users } from "@repo/database/db";
export const addCustomQuestion = async (req, res) => {
    try{
        const {email} = req.user;
        if(!email){
            const response: basicResponseType = {
                success: false,
                error: "Unauthorized",
                redirect: "/login"
            }
            return res.status(401).json(response);
        }
        const body: AddCustomQuestionRequestType = req.body;

        const {title, folderId, sheetId, problemStatement, inputs, platform, difficulty} = body;

        if(!title || !folderId || !sheetId || !problemStatement || !inputs || !platform || !difficulty){
            const response: basicResponseType = {
                success: false,
                error: "Missing required fields"
            }
            return res.status(400).json(response);
        }

        const userFromDb = await Users.findOne({email: email});
        
        if(!userFromDb){
            const response: basicResponseType = {
                success: false,
                error: "Unauthorized",
                redirect: "/login"
            }
            return res.status(401).json(response);
        }

        // add to db 
        const questionFromDb = await QuestionDB.create({
            title,
            folderId,
            sheetId,
            problemStatement,
            inputs,
            platform,
            difficulty,
            type: "Custom",
            createdBy: userFromDb._id,
            solvedAt: null
        });

        if( !questionFromDb){
            const response: basicResponseType = {
                success: false,
                error: "Failed to add question"
            }
            return res.status(500).json(response);
        }

        const normalisedQuestion: Question = {
            id: questionFromDb._id.toString(),
            title: questionFromDb.title,
            folderId: questionFromDb.folderId.toString(),
            sheetId: questionFromDb.sheetId.toString(),

            ...(questionFromDb.problemStatement && {
                problemStatement: questionFromDb.problemStatement
            }),

            inputs: questionFromDb.inputs?.map(input => ({
                input: input.input ?? "",
                output: input.output ?? ""
            })),
            solvedAt: questionFromDb.solvedAt ?? null,
            platform: questionFromDb.platform ?? "",
            difficulty: questionFromDb.difficulty as "easy"|"medium"|"hard",
            type: questionFromDb.type ?? "Normal",
            link: questionFromDb.link ?? "",
            resourceLink: questionFromDb.resourceLink ?? "",
            notes: questionFromDb.notes ?? "",
            done: questionFromDb.done ?? false,
        };

        type responseType = basicResponseType & {
            Question?: Question
        }
        const response: responseType  = {
            success: true,
            message: "Question added successfully",
            Question: normalisedQuestion
        };

        return res.status(201).json(response);

    }catch(err){
        console.error("Error in addCustomQuestion:", err);
        const response: basicResponseType = {
            success: false,
            error: "Server error"
        }
        return res.status(500).json(response);
    }
}