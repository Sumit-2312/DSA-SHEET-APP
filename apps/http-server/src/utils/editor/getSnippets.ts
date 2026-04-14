import { Users } from '@repo/database/db';
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
        if( userFromDb.snippets.length <= 0 ){
            const response: snippetResponseType={
                success: true,
                message:"Fetched snippets successfully",
                snippets: []
            }
            return res.status(200).json(response);
        }
        const snippets = userFromDb.snippets.map((snippet) => ({
            ...snippet,
            user: snippet.user.toString()
        })); // array of snippet with name,user,content

        const response:snippetResponseType = {
            success: true,
            message:"Fetched snippets successfully",
            snippets
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