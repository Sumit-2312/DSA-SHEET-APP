import express  from 'express';
import dotenv from 'dotenv'
dotenv.config();
import RegisterHandler from '../utils/auth/signupHandler.js';
import MailHandler from '../utils/auth/mailHandler.js';
import verifyHandler from '../utils/auth/verifyHandler.js';
import LoginHandler from '../utils/auth/loginHandler.js';
const AuthRouter = express.Router();



AuthRouter.post('/register',RegisterHandler);
AuthRouter.post("/sendMail",MailHandler);
AuthRouter.post("/verify",verifyHandler);
AuthRouter.get('/login',LoginHandler);


export default AuthRouter;