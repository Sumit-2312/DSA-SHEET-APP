import { Snippet, Users } from "@repo/database/db";
import type { Response } from "express";
import type {addSnippetRequestType} from '@repo/types/apiRequests/addSnippetRequestType'
import type {addSnippetResponseType} from '@repo/types/apiResponse/addSnippetResponseType'
export const addSnippet = async (req: any, res: Response) => {
    const body: addSnippetRequestType = req.body;
    const email = req.user?.email; // this will be added by the middleware

    if (!email) {
        const response:addSnippetResponseType={
            success: false,
            error: "login first",
            redirect: "/login"
        }
        return res.status(401).json(response);
    }

    if (!body.content || typeof body.content !== 'string') {
        const response:addSnippetResponseType ={
            success: false,
            error: "You need to have some code"
        }
        return res.status(400).json(response);
    }

    if (!body.name || typeof body.name !== 'string') {
        const response:addSnippetResponseType ={
            success: false,
            error: "Snippet name is required"
        }
        return res.status(400).json(response);
    }

    if(!body.language || typeof body.language !== 'string'){
        const response:addSnippetResponseType ={
            success: false,
            error: "Snippet language is required"
        }
        return res.status(400).json(response);
    }


    try {
        const userFromDb = await Users.findOne({ email });

        if (!userFromDb) {
            const response: addSnippetResponseType={
                success: false,
                error: "User not found",
                redirect: "/login",
            }
            return res.json(response);
        }


        const addedSnippet = await Snippet.create({
            name: body.name,
            content: body.content,
            user: userFromDb._id.toString(),
            language: body.language
        })

       if(!addedSnippet){
        const response: addSnippetResponseType={
            success: false,
            error: "Failed to add snippet"
        }
        return res.status(500).json(response);
       }
       
        const snippetToReturn = {   
            id: addedSnippet._id,
            name: addedSnippet.name,
            content: addedSnippet.content,
            language: addedSnippet.language,
            user: addedSnippet.user
        }
        const response: addSnippetResponseType = {
            success: true,
            message: "Added Snippet",
            snippet: snippetToReturn // return the newly added snippet
        };

        return res.json(response);

    } catch (err: unknown) {
        console.log("error in addSnippet catch block");

        if (err instanceof Error) {
            const response: addSnippetResponseType={
                success: false,
                error: err.message
            }
            return res.status(500).json(response);
        }

        const response: addSnippetResponseType ={
            success: false,
            error: "Unknown error"
        }
        return res.status(500).json(response);
    }
};