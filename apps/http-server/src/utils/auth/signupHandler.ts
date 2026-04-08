import bcrypt from "bcrypt";
import { Users } from "@repo/database/db";
import type { registerResponseType } from "@repo/types/apiResponse/registerResponseType";
import type { Request, Response } from "express";
const RegisterHandler = async(req:Request, res: Response)=>{
    try{
      

        const {name,password,email} = req.body;
        // check if the user with this email already exists or not
        // if successfull -> return document
        // if no document exist -> return null
        // if something went wrong -> throws error
        const user = await Users.findOne({email});

        if( user ){
            const response : registerResponseType = {
                success: true,
                redirect: "/login",
                message: "User already exist please try to signin"
            }
            return res.status(200).json(response);
        }
        
        else{
            const hashedPass = await bcrypt.hash(password,10); // password,saltRounds
            // if successfull -> return document 
            // if fails -> throws error
            await Users.create({
                name,
                password: hashedPass,
                email,
                isVerified: false
            });
            const response: registerResponseType = {    
                success: true,
                redirect: "/login",
                message: "You have successfully signed up"
            }
            return res.status(200).json(response);
        }
    }
    catch(err){
        let response: registerResponseType = {
            success: false,
        }
      if(err instanceof Error){
        response = {...response,error: err.message}
        return res.status(500).json(response);
      } else{
        response = {...response,error: "An unknown error occurred"}
        return res.status(500).json(response);
      }
   
    }
}
export default RegisterHandler;