import type { basicResponseType } from '@repo/types/apiResponse/basicResponseType';
import express, { type Request, type Response } from 'express';
import { getSheetTree } from '../utils/others/getSheets.js';
import addFolder from '../utils/sheet/addFolder.js';
import removeFolder from '../utils/sheet/removeFolder.js';
import addQuestion from '../utils/sheet/addQuestion.js';
import markSolved from '../utils/sheet/markSolve.js';
import removeQuestion from '../utils/sheet/removeQuestion.js';

const SheetRouter = express.Router();

/* =========================
   GET SHEET TREE
   /api/sheet/tree?sheet=Striver
========================= */
SheetRouter.get('/tree', async (req: any, res: Response) => {
    const user = req.user;

    try {
        /* =========================
           1. VALIDATIONS
        ========================= */
        if (!user || !user.email) {
            const response: basicResponseType = {
                success: false,
                error: "Unauthorized"
            };
            return res.status(401).json(response);
        }

        const sheetName = req.query.sheet as "Fraz" | "Striver";

        if (!sheetName || !["Fraz", "Striver"].includes(sheetName)) {
            const response: basicResponseType = {
                success: false,
                error: "Invalid or missing sheet name"
            };
            return res.status(400).json(response);
        }

        /* =========================
           2. CALL SERVICE
        ========================= */
        const data = await getSheetTree(user.email.toString(), sheetName);

        /* =========================
           3. SUCCESS RESPONSE
        ========================= */
        const response: basicResponseType & { data?: any } = {
            success: true,
            data
        };

        return res.status(200).json(response);

    } catch (err) {
        /* =========================
           ERROR HANDLING
        ========================= */
        if (err instanceof Error) {
            const response: basicResponseType = {
                success: false,
                error: err.message
            };
            return res.status(500).json(response);
        } else if (typeof err === 'string') {
            const response: basicResponseType = {
                success: false,
                error: err
            };
            return res.status(500).json(response);
        } else {
            const response: basicResponseType = {
                success: false,
                error: "Unknown error occurred"
            };
            return res.status(500).json(response);
        }
    }
});

SheetRouter.post('/addFolder',addFolder);
SheetRouter.post('/removeFolder',removeFolder);
SheetRouter.post('/addQuestion',addQuestion);
SheetRouter.patch('/markSolved',markSolved);
SheetRouter.post('/removeQuestion',removeQuestion);

export default SheetRouter;