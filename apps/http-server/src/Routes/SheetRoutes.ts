
import express from 'express';
import { sheetData } from '../utils/sheet/sheetData.js';
import { sheetList } from '../utils/sheet/sheetList.js';
import { userDetails } from '../utils/sheet/userDetails.js';
import { updateQuestion } from '../utils/sheet/updateQuestion.js';
import { addQuestion } from '../utils/sheet/addQuestion.js';
import { removeQuestion } from '../utils/sheet/removeQuestion.js';
import { addFolder } from '../utils/sheet/addFolder.js';
import { updateFolder } from '../utils/sheet/updateFolder.js';
import { removeFolder } from '../utils/sheet/removeFolder.js';
import { createSheet } from '../utils/sheet/createSheet.js';
import { deleteSheet } from '../utils/sheet/deleteSheet.js';
import { updateSheet } from '../utils/sheet/updateSheet.js';
import { addCustomQuestion } from '../utils/sheet/addCustomQuestion.js';
import { get } from 'mongoose';
import getCustomQuestionById from '../utils/sheet/getCustomQuestionById.js';


const SheetRouter = express.Router();

SheetRouter.get('/SheetData', sheetData); 
SheetRouter.get('/SheetList', sheetList); 
SheetRouter.get('/user', userDetails);
SheetRouter.post('/customQuestion', addCustomQuestion); 
SheetRouter.patch('/question', updateQuestion); 
SheetRouter.post('/question', addQuestion); 
SheetRouter.delete('/question', removeQuestion);    
SheetRouter.post('/folder',  addFolder); 
SheetRouter.patch('/folder', updateFolder);
SheetRouter.delete('/folder', removeFolder); 
SheetRouter.post('/createSheet',createSheet); 
SheetRouter.delete('/Sheet',deleteSheet);
SheetRouter.patch('/Sheet',updateSheet); 
SheetRouter.get('/customQuestion/:id', getCustomQuestionById);

export default SheetRouter;