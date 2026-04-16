import { Users } from "@repo/database/db";
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
        const userFromDb = await Users.findOne({email});    
        if( !userFromDb ){
            return res.status(404).json({
                success: false,
                error: "User not found",
                redirect: "/login"
            });
        }

        const snippetIndex = userFromDb.snippets.findIndex((snippet) => snippet._id.toString() === snippetId);
        console.log(userFromDb);
        if( snippetIndex === -1 ){
            console.log("snippetIndex === -1 function called");
            return res.status(404).json({
                success: false,
                error: "Snippet not found"
            });
        }

        const snippet = userFromDb.snippets[snippetIndex];
        if( !snippet ){
            console.log("!snippet function called");
            return res.status(404).json({
                success: false,
                error: "Snippet not found"
            });
        }

        if(name) snippet.name = name;
        if(content) snippet.content = content;
        if(language) snippet.language = language;

        await userFromDb.save();

        return res.json({
            success: true,
            message: "Snippet updated successfully",
            snippet: userFromDb.snippets[snippetIndex]
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