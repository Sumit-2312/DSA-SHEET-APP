import { Sheets } from "@repo/database/db";
import type { Response } from "express";

export const updateSheet = async(req:any,res:Response)=>{

    const {email} = req.user;
    if(!email){
        const response = {
            success: false,
            error: "User not found",
            redirect: "/login"
        }
        return res.json(response);
    }

    try{
        const {id,name} = req.body;
        if(!id || !name){
            const response = {
                success: false,
                error: "sheet id or name not provided"
            }
            return res.json(response);
        }

        const sheetFromDb = await Sheets.findById(id);
        if(!sheetFromDb){
            const response = {
                success: false,
                error: "Sheet not found"
            }
             return res.json(response);
        }

        sheetFromDb.name = name;
        await sheetFromDb.save();

        const response = {
            success: true,
            message: "Sheet updated"
        }
        return res.json(response);
    }catch(err){
        console.log(`Error while updating the sheet ${err}`);
       return  res.json({
            success: false,
            error: "Internal Server error"
        })
    }
}