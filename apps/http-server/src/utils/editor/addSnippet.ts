import { Users } from "@repo/database/db";
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

    if (!body.content) {
        const response:addSnippetResponseType ={
            success: false,
            error: "You need to have some code"
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

        const newSnippet = {
            name: body.name,
            content: body.content,
            user: userFromDb._id.toString()
        };

        userFromDb.snippets.push(newSnippet);

        await userFromDb.save();

        const response : addSnippetResponseType={
            success: false,
            message: "Added Snippet",
            snippet: {
                name: newSnippet.name,
                content: newSnippet.content,
                user: email
            }
        }

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