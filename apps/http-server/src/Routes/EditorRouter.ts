import express, { type Request, type Response} from "express";

import { JudgeRequest } from "../utils/judge0/JudgeRequest.js";
import Execute from "../utils/editor/codeExecute.js";
import {getSnippets} from '../utils/editor/getSnippets.js'
import { addSnippet } from "../utils/editor/addSnippet.js";
const EditorRouter = express.Router();

EditorRouter.post("/executeCode",Execute);

EditorRouter.get("/snippet",getSnippets);

EditorRouter.post('/snippet',addSnippet);

EditorRouter.patch('/snippet');
EditorRouter.post('/snippet/delete');

export default EditorRouter;