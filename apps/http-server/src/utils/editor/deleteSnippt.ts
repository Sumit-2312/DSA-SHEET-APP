import { Users } from "@repo/database/db";
import type { Response } from "express";

const deleteSnippet = async (req:any,res:Response) => {  
    const {email} = req.user;
    const {id} = req.body;

    if( !email ){
        return res.status(401).json({
            success: false,
            error: "login first",
            redirect: "/login"
        });
    }

    if( !id ){
        return res.status(400).json({
            success: false,
            error: "Snippet id is required"
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

        const snippetIndex = userFromDb.snippets.findIndex((snippet) => snippet._id.toString() === id);
        if( snippetIndex === -1 ){
            return res.status(404).json({       
                success: false,
                error: "Snippet not found"
            });
        }

        userFromDb.snippets.splice(snippetIndex, 1); // remove the snippet from the array

        await userFromDb.save();
        
        return res.json({
            success: true,
            message: "Snippet deleted successfully"
        }); 
    }catch(err:unknown){
        console.log("error in deleteSnippet catch block");      
        if( err instanceof Error){  
            const response = {
                success: false,
                error: err.message,
            }
            return res.status(500).json(response);
        }else if( typeof err === 'string' ){
            const response = {
                success: false,
                error: err
            }
            res.status(500).json(response);
        }
    }
}

export default deleteSnippet;