import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import type { NextFunction, Request, Response } from 'express';
dotenv.config();

interface AuthRequest extends Request{
    user? : string | jwt.JwtPayload;
}

export default function AuthMiddleware(req:AuthRequest,res:Response,next:NextFunction){
    // check if the token sent by the user is valid or not
    try{
        let token = req.headers.authorization?.split(" ")[1];
        
        if(!token){
            console.log("token not provided");
            return res.status(401).json({
                message: "Unauthorized",
                redirect:"/login"
            });
        }
        // verify the token
        console.log("in authMiddleware with token ", token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        if(typeof decoded === "string"){
            console.log("decoded token is string ", decoded);
            return res.status(401).json({
                message: "Unauthorized",
                redirect:"/login"
            });
        }
        req.user = decoded;
        next();
    }catch(err:unknown){
        if( err instanceof Error){
            return res.status(500).json({
                message: "Something went wrong in catch block",
                error: err.message
            });
        }else return res.status(500).json({
            message: "Unknown error occured in authMIddleware",
            error: "Unknown error"
        })
    }
}