import { Sheets, Users } from "@repo/database/db";
import type { Response } from "express";

export const deleteSheet = async(req:any, res: Response)=>{
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
        const userFromDb = await Users.findOne({email});
        if(!userFromDb){
            const response = {
                success: false,
                error: "User not found",
                redirect: "/login"
            }
             return res.json(response);
        }
        const {id} = req.body;
        if(!id){
            const response = {
                success: false,
                error: "snippet id not provided"
            }
            return res.json(response);
        }

        userFromDb.sheets.filter((sheet)=>sheet._id.toString() != id);
        await userFromDb.save();
        await Sheets.findByIdAndDelete({_id: id});

        const response = {
            success: true,
            message: "Sheet deleted"
        }
        return res.json(response);
    }catch(err){
        console.log(`Error while deleting the sheet ${err}`);
       return  res.json({
            success: false,
            error: "Internal Server error"
        })
    }
}