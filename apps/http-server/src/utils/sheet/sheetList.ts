import { response, type Response } from "express";
import type { getSheetDetailResponseType, singleSheetData } from "@repo/types/apiResponse/getSheetDetailResponseType";
import { Sheets, Users } from "@repo/database/db";
export const sheetList = async(req:any,res:Response) => {
    const { email } = req.user;
    if( !email ){
        const response: getSheetDetailResponseType = {
            success: false,
            error: 'Email is required',
            redirect:'/login',
        }
        return res.status(400).json(response);
    } 

    try{
        const userFromDb = await Users.findOne({email:email});

        if( !userFromDb ){
            const response: getSheetDetailResponseType = {
                success: false,
                error: 'User not found',
                redirect:'/login',
            }
            return res.status(404).json(response);
        }

        const userId = userFromDb._id.toString();

        const allSheets = await Sheets.find({createdBy:userId});

        const SheetsToSend:singleSheetData[] = allSheets.map((sheet)=>{
            return {
                id: sheet._id.toString(),
                name: sheet.name
            }
        })

        console.log(`all sheets ${SheetsToSend}`);

        const response: getSheetDetailResponseType = {
            success: true,
            sheets: SheetsToSend,
        }
        return res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching sheets:', error);
        const response: getSheetDetailResponseType = {
            success: false,
            error: 'Internal Server Error',
        };
        return res.status(500).json(response);
    }
}