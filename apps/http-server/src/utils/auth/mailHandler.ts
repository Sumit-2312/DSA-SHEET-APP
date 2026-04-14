import { Users } from "@repo/database/db";
import { sendMail } from "../mail/mail.js";
import type {sendMailRequestType} from '@repo/types/apiRequests/sendMailRequestType'
import type {sendMailResponseType} from '@repo/types/apiResponse/sendMailResponseType'
const MailHandler = async(req,res)=>{
    try{

        const {email}:sendMailRequestType = req.body;
        // check if the email exist in database or not
        const user = await Users.findOne({email});
        if( !user ){
            const response:sendMailResponseType = {
                success: false,
                error:"User not found!"
            }
            console.log(`sending response: ${response}`);
            return res.status(400).json(response);
        }
        // if user exists
        // send him the mail
        console.log("before sending mail")
       const mailresponse = await sendMail(email,user._id);
         console.log("after sending mail")

       if( !mailresponse?.success ){
            const response:sendMailResponseType={
                success:false,
                error: "not able to send mail"
            }
            console.log(`sending response: ${response}`);
            return res.status(500).json(response);
       }
       else{
        const response:sendMailResponseType={
            success:true,
            message: mailresponse?.message as string
        }
        console.log(`sending response: ${response}`);
        return res.status(200).json(response);
       }

    }catch(err){
        if(err instanceof Error){
            const response:sendMailResponseType={
                success: false,
                error: err.message
            }
            return res.status(500).json(response);
        }
        else{
            const response:sendMailResponseType={
                success: false,
                error: "An unknown error occurred"
            }
            return res.status(500).json(response);
        }
    }
}
export default MailHandler;