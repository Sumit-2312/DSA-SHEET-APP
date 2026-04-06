import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

async function Connect() {
    try {
        if( !process.env.MONGO_URI ){
            throw new Error("No mongo url in env file");
        }
        console.log(process.env.MONGO_URI); // this will check in evn file of package where it is imported
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log("Connected to database");

        return {
            success: true
        };

    } catch (err:any) {
        return {
            success: false,
            error: err.message
        };
    }
}

export default Connect;