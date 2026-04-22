import { Sheets, Users } from "@repo/database/db";
import { response, type Response } from "express";

export const createSheet = async (req:any, res:Response) => {

    const { email } = req.user;
    if( !email ){
        return res.status(400).json({
            success: false,
            error: 'Email is required',
            redirect:'/login',
        });
    }

    try {
        const {name} = req.body;
        
        if( !name ){    
            return res.status(400).json({
                success: false,
                error: 'Sheet name is required',
            });
        }

        const userFromDb = await Users.findOne({ email });

        if( !userFromDb ){
            return res.status(404).json({
                success: false,
                error: 'User not found',
                redirect:'/login',
            });
        }

        const newSheet = await Sheets.create({
            name,
            createdBy: userFromDb._id
        })

        if( !newSheet ){
            return res.status(500).json({
                success: false,
                error: 'Failed to create sheet',
            });
        }

        return res.status(200).json({
            success: true,
            sheet: {
                id: newSheet._id.toString(),
                name: newSheet.name,
            }   
        });

    } catch (error) {
        console.error('Error creating sheet:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }

}