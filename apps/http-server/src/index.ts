import express from 'express';
import dotenv from 'dotenv';
import Connect from "@repo/database/connect";
import type { connection } from '@repo/types/dbtypes/connection'
dotenv.config();
const app = express();

async function start(){

    try{
       const response: connection = await Connect();
       if( !response.success ){
         throw new Error(response.error);
       }

        app.listen(process.env.PORT||3000,()=>
            console.log(`http-server started on port ${process.env.PORT||3000}`
        ));



    }catch(err:unknown){
        console.log("Error occured while starting the http-server in index.ts file");
        if(err instanceof Error){ // Type guard to check if err is an instance of Error
            // other instaces of error can be handled here like if it is a string or something else
            // checking if it is a string
            if(typeof err === "string"){
                console.log(`Error is : ${err}`);
            }else if( typeof err === "object" && 'message' in err){     
                console.log(`Error is : ${err.message}`);
            }

        }else{
            console.log("Unknown error");
        }
        process.exit(1);
    }
}

start();