import { Snippet, Users } from '@repo/database/db';
import express, { type Request, type Response } from 'express';
import type {snippetResponseType,snippetType} from '@repo/types/apiResponse/snippetsResponseType'

export const getSnippets = async( req:any, res:Response)=>{
    const {email} = req.user; 
    
    try{
        const userFromDb = await Users.findOne({email}).lean();
        if(!userFromDb){
            const response: snippetResponseType = {
                success: false,
                error: "User not Found"
            }
            return res.json(response);
        }
        console.log(userFromDb);
        const userId = userFromDb._id.toString();

        const snippets = await Snippet.find({user:userId});

        if(  snippets.length == 0 ){
            const response: snippetResponseType={
                success: true,
                message:"Fetched snippets successfully",
                snippets: []
            }
            return res.status(200).json(response);
        }
        const snippetsToSend:snippetType[] = snippets.map((snippet) => ({
            name: snippet.name,
            content: snippet.content,
            language: snippet.language,
            user: snippet.user.toString(),
            id: snippet._id.toString()
        })); // array of snippet with name,user,content

        const response:snippetResponseType = {
            success: true,
            message:"Fetched snippets successfully",
            snippets: snippetsToSend
        }
        return res.json(response);
    }catch(err:unknown){
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