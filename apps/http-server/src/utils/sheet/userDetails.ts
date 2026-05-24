import { Sheets, Users } from "@repo/database/db";
import type { basicResponseType } from "@repo/types/apiResponse/basicResponseType";
import type { Response } from "express";

export const userDetails = async(req:any,res:Response) => {
    const {email} = req.user;
    try{
        if(!email){
            const response:basicResponseType = {
                success: false,
                error: "No email found",
                redirect: "/login"
            }
            return res.status(400).json(response);
        }

        const userFromDb = await Users.findOne({email:email});
        if(!userFromDb){
            const response:basicResponseType = {
                success: false,
                error: "Register first",
                redirect:"/register"
            }
            return res.status(400).json(response);
        }

        // response format : name,email,sheets:{id,name}
        let userDetails:{
            name: string,
            email: string,
            sheets:{
                id: string,
                name: string
            }[] | []
        }={
            name: userFromDb.name,
            email: userFromDb.email,
            sheets: []
        };

        const userSheets = await Sheets.find({createdBy:userFromDb._id.toString()});
        const userSheetsNormalised = userSheets.map((sheet)=>{
            return {
                id: sheet._id.toString(),
                name: sheet.name
            }
        });
        userDetails.sheets = userSheetsNormalised;

        return res.status(200).json({
            success: true,
            message: "Fetched user details",
            userDetails: userDetails
        });

    }catch(err:any){
        console.log(`Error while fetching userDetails: ${err}`);
        return res.status(500).json({
            success: false,
            error: `User details not found ${err.message}`
        })
    }
}