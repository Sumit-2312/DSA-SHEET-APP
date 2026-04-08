 import jwt from 'jsonwebtoken'
 import {Users} from '@repo/database/db';
 import bcrypt from 'bcrypt';
 import type { loginResponseType } from '@repo/types/apiResponse/loginResponseType';
import type { Request, Response } from 'express';
import type { loginRequestType } from '@repo/types/apiRequests/loginRequestType';

 const LoginHandler = async(req:Request,res:Response)=>{
    try{

        const {email,password}:loginRequestType = req.body;
        // check if the user exist with this email or not
        const user = await Users.findOne({email});
        if( !user ){
            const response : loginResponseType = {
                success: false,
                isVerified: false,
                email: "",
                error: "No such email exist",
            }
            console.log(`No user exist with email : ${email}`);
            return res.status(400).json(response);
        }
        // if user exist then compare the password
        const isMatch = await bcrypt.compare(password,user.password);
        if( !isMatch ){
            console.log(`Incorrect password provided for email : ${email}`);
            const response : loginResponseType = {
                success: false,
                isVerified: false,
                email: email,
                error: "Incorrect password"
            }
            return res.status(400).json(response);
        }

        // after the password is matched , generate the token using jwt and send back to the user on frontend

        const token = jwt.sign({
            email : email,
            isVerified: user.isVerified
        },process.env.JWT_SECRET as string);

        const response : loginResponseType = {
            success: true,
            isVerified: user.isVerified,
            email: email,
            message: "You have successfully signed in",
            token: token
        }
        return res.status(200).json(response);

    }catch(err){
        console.log("Error in catch block");
        console.log(err);
       if(err instanceof Error) {
            const response: loginResponseType = {
                success: false,
                isVerified: false,
                email: "",
                error: err.message
            }
            return res.status(500).json(response);
        }
        else {
            const response: loginResponseType = {
                success: false,
                isVerified: false,
                email: "",
                error: "An unknown error occurred"
            }
            return res.status(500).json(response);  
        }
    }
}

export default LoginHandler;