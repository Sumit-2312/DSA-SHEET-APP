import { Question as QuestionDB } from "@repo/database/db";
import type { basicResponseType } from "@repo/types/apiResponse/basicResponseType";
import type { Question } from "@repo/types/apiResponse/getSheetDataResponseType";

export default async function getCustomQuestionById(req,res){
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

        const {id} = req.params;

        if(!id){
            const response: basicResponseType = {
                success: false,
                error: "Question id is required"
            }
            return res.status(400).json(response);
        }

        const questionFromDb = await QuestionDB.findById(id);

        if(!questionFromDb){
            const response: basicResponseType = {
                success: false,
                error: "No such question exist"
            }
            return res.status(404).json(response);
        }
        const normalizedQuestion: Question = {
                id: questionFromDb._id.toString(),
                title: questionFromDb.title,
                link: questionFromDb.link?? "",
                resourceLink: questionFromDb.resourceLink ?? "",
                notes: questionFromDb.notes,
                platform: questionFromDb.platform as string,
                difficulty: questionFromDb.difficulty as "easy" | "medium" | "hard",
                folderId: questionFromDb.folderId?.toString(),
                sheetId: questionFromDb.sheetId?.toString(),
                done: questionFromDb.done,
                type: (questionFromDb.type as "Custom" | "Normal") ?? "Normal",
                ...(questionFromDb.problemStatement && {
                problemStatement: questionFromDb.problemStatement
                }),
                inputs: questionFromDb.inputs?.map(input => ({
                input: input.input ?? "",
                output: input.output ?? ""
                })) || [],
                solvedAt: questionFromDb.solvedAt ?? null
            };

        const response = {
            success: true,
            Question: normalizedQuestion
        }
        return res.status(200).json(response);
    }catch(err){
        console.error("Error in getCustomQuestionById:", err);
        const response: basicResponseType = {
            success: false,
            error: "Internal Server Error"
        }
        return res.status(500).json(response);
    }
}   