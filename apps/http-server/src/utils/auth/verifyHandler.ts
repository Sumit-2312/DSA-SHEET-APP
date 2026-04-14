import {OTP,Users} from "@repo/database/db";
import type {verifyRequestType} from '@repo/types/apiRequests/verifyRequestType'
import type {verifyResponseType} from '@repo/types/apiResponse/verifyResponseType'
import  jwt  from "jsonwebtoken";
const verifyHandler = async(req,res)=>{
    try{
        const {email,otp}:verifyRequestType = req.body;
        // check in the database
        // otp collection -> user,otp,expiry
        const user = await Users.findOne({email});
        if( !user ){
            const response:verifyResponseType ={
                success: false,
                error: "User not found"
            }
            return res.status(400).json(response);
        }
        console.log("after user check")
        
        // no find the user_id and otp entry in otp collection
        //@ts-ignore
        const isEntry = await OTP.findOne({user:user._id,otp:otp});
        if( !isEntry ){
            console.log("Wrong OTP provided");
            const response:verifyResponseType={
                success: false,
                error: "wrong OTP"
            }
            return res.status(400).json(response);
        }  
        console.log("after otp check")

        // check for expiry date of OPT given
        if( isEntry.expiry < new Date() ){
            const response:verifyResponseType={
                success: false,
                error: "OTP expired"
            }
            return res.status(400).json(response);
        }
        console.log("after expiry check")
        
        // if all condition are passed then update the user collection and set isVerified to true
        await Users.updateOne({_id: user._id},{$set:{isVerified: true}});
        console.log("after updating user collection")
        // delete the OTP entry for that user
        await OTP.deleteOne({user: user._id});
        console.log("after deleting otp entry")
        // also generate the new token now 
        const newToken = jwt.sign({
            email:email,
            isVerified: true
        },process.env.JWT_SECRET as string);

        const response:verifyResponseType={
            success: true,
            message: "Verified successfully",
            redirect:"/editor",
            token: newToken
        }
        console.log(`sending response : ${response}`);
        return res.status(200).json(response);

    }catch(err){
       if(err instanceof Error)
        {
            const response: verifyResponseType = {
                success: false,
                error: err.message
            }
            console.log(`sending response : ${response}`);
            return res.status(400).json(response);
        } 
        const response: verifyResponseType = {
            success: false,
            error: "Unknown error"
        }
        console.log(`sending response : ${response}`);
        return res.status(400).json(response);
    }
}

export default verifyHandler;