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
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        // verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
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