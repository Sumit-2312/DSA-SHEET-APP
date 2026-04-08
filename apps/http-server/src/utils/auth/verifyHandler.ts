import {OTP,Users} from "@repo/database/db";
const verifyHandler = async(req,res)=>{
    try{
      

        const {email,otp} = req.body;
        // check in the database
        // otp collection -> user,otp,expiry
        const user = await Users.findOne({email});
        if( !user ){
            console.log("No such user exist with given email");
            return res.status(400).json({
                message: "something went wrong",
                error: "No such user exist with given email"
            });
        }
        console.log("after user check")
        
        // no find the user_id and otp entry in otp collection
        const isEntry = await OTP.findOne({user:user._id,otp:otp});
        if( !isEntry ){
            console.log("Wrong OTP provided");
            return res.status(400).json({
                message: "something went wrong",
                error: "Wrong OTP provided"
            });
        }  
        console.log("after otp check")

        // check for expiry date of OPT given
        if( isEntry.expiry < new Date() ){
            return res.status(400).json({
                message: "something went wrong",
                error: "OTP expired"
            });
        }
        console.log("after expiry check")
        
        // if all condition are passed then update the user collection and set isVerified to true
        await Users.updateOne({_id: user._id},{$set:{isVerified: true}});
        console.log("after updating user collection")
        // delete the OTP entry for that user
        await OTP.deleteOne({user: user._id});
        console.log("after deleting otp entry")
        return res.status(200).json({
            redirect: "/login",
            message: "Your account has been verified successfully"
        });

    }catch(err){
        console.log("Error in catch block");
        console.log(err);
       if(err instanceof Error) return res.status(400).json({
            message: "Something went wrong",
            error: err.message
        });
        return res.status(400).json({  
            message: "Something went wrong",
            error: "Unknown error"
        });
    }
}

export default verifyHandler;