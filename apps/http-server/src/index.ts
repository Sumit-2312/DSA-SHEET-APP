import express from 'express';
import dotenv from 'dotenv';
import Connect from "@repo/database/connect";
import type { connectionType } from '@repo/types/dbtypes/connection'
import AuthRouter from './Routes/AuthRouter.js';
import cors from 'cors';
import AuthMiddleware from './Middlewares/AuthMiddleware.js';
import SheetRouter from './Routes/SheetRoutes.js';
import EditorRouter from './Routes/EditorRouter.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

async function start(){

    try{
       const response: connectionType = await Connect();
       if( !response.success ){
         throw new Error(response.error);
       }

       app.use('/auth',AuthRouter);
       app.use('/sheet',AuthMiddleware,SheetRouter);
       app.use('/editor',AuthMiddleware,EditorRouter);
       
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