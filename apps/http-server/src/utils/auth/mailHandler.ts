import { Users } from "@repo/database/db";
import { sendMail } from "../mail/mail.js";

const MailHandler = async(req,res)=>{
    try{

        const {email} = req.body;
        // check if the email exist in database or not
        const user = await Users.findOne({email});
        if( !user ){
            return res.status(400).json({
                message: "User don't exist with this email",
                error: "No email exist"
            });
        }
        // if user exists
        // send him the mail
        console.log("before sending mail")
       const response = await sendMail(email,user._id);
         console.log("after sending mail")
       if( !response.success ){
            return res.status(500).json({
                error: response.error
            });
       }
       else{
        return res.status(200).json({
            message: response.message
        });
       }

    }catch(err){
        if(err instanceof Error){
            return res.status(500).json({
                error: err.message
            });
        }
        else{
            return res.status(500).json({
                error: "An unknown error occurred"
            });
        }
    }
}
export default MailHandler;