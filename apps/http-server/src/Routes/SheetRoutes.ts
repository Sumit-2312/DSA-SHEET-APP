
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

const SheetRouter = express.Router();

SheetRouter.get('/SheetData', sheetData); // done
SheetRouter.get('/SheetList', sheetList); // done
SheetRouter.get('/userDetails', userDetails);
SheetRouter.post('/updateQuestion', updateQuestion);
SheetRouter.post('/addQuestion', addQuestion); // done
SheetRouter.post('/removeQuestion', removeQuestion);    
SheetRouter.post('/addFolder',  addFolder); // done
SheetRouter.post('/updateFolder', updateFolder);
SheetRouter.post('/removeFolder', removeFolder); 
SheetRouter.post('/createSheet',createSheet); //
SheetRouter.delete('/Sheet',deleteSheet);
SheetRouter.patch('/Sheet',updateSheet); //


export default SheetRouter;