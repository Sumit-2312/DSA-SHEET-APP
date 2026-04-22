import { Snippet,  Users } from "@repo/database/db";
import type { basicResponseType } from "@repo/types/apiResponse/basicResponseType";
import type { Response } from "express";

const editSnippet = async(req:any, res:Response)=>{

    const {email} = req.user;
    const {snippetId, name, content,language} = req.body;

    if( !email ){
        return res.status(401).json({
            success: false,
            error: "login first",
            redirect: "/login"
        });
    }

    if( !name && !content && !language){
        return res.status(400).json({
            success: false,
            error: "You need to provide at least one field to update"
        });
    }
    
    try{

        const snippetFromDb = await Snippet.findById(snippetId);


        if(!snippetFromDb){
            const response:basicResponseType = {
                success: false,
                error: "Snippet not found"
            }
            return res.status(400).json(response);
        }

        if(name) snippetFromDb.name = name;
        if(content) snippetFromDb.content = content;
        if(language) snippetFromDb.language = language;

        await snippetFromDb.save();

        const snippetToSend = {
            id: snippetFromDb._id.toString(),
            name: snippetFromDb.name,
            content: snippetFromDb.content,
            language: snippetFromDb.language
        }

        return res.json({
            success: true,
            message: "Snippet updated successfully",
            snippet: snippetToSend
        });

    }catch(err:unknown){
        console.log("error in editSnippet catch block");
        if( err instanceof Error ){
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }else if( typeof err === 'string' ){
            return res.status(500).json({
                success: false,
                error: err
            });
        }   

    }
}

export default editSnippet;