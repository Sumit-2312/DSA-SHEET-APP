import type { Response } from "express";
import type { Folder, getSheetDataResponseType, Question as QuestionType } from '@repo/types/apiResponse/getSheetDataResponseType';
import type { basicResponseType } from "@repo/types/apiResponse/basicResponseType";
import { Folders, Question, Sheets, Users } from "@repo/database/db";

function buildFolder(
    folder: any,
    parentFolderId: string | null,
    folderChildMap: Map<string, any[]>,
    folderQuestionMap: Map<string, any[]>
): Folder {

    let finalFolder: Folder = {
        id: folder._id.toString(),
        name: folder.name,
        parentFolderId: parentFolderId,
        questions: [],
        childFolders: []
    };

    const folderId = folder._id.toString();
    const children = folderChildMap.get(folderId) || [];

    // attach questions (you can allow both cases)
    const qs = folderQuestionMap.get(folderId) || [];
    finalFolder.questions = qs.map((q): QuestionType => ({
        id: q._id.toString(),
        title: q.title,
        link: q.link,
        resourceLink: q.resourceLink,
        notes: q.notes,
        platform: q.platform,
        difficulty: q.difficulty,
        folderId: q.folderId?.toString(),
        sheetId: q.sheetId?.toString(),
        done: q.done
    }));

    // recursively build children
    finalFolder.childFolders = children.map((child) =>
        buildFolder(child, folderId, folderChildMap, folderQuestionMap)
    );

    return finalFolder;
}

export const sheetData = async (req: any, res: Response) => {
    const { email } = req.user;

    if (!email) {
        const response: basicResponseType = {
            success: false,
            error: "User not found",
            redirect: "/login"
        };
        return res.status(400).json(response);
    }

    try {
        const { id } = req.query;

        if (!id) {
            const response: basicResponseType = {
                success: false,
                error: "Id is not provided"
            };
            return res.status(400).json(response);
        }

        const userFromDb = await Users.findOne({ email: email });
        const userId = userFromDb?._id;

        if (!userId) {
            const response: basicResponseType = {
                success: false,
                error: "User not found in database"
            };
            return res.status(400).json(response);
        }

        // fetch all data in parallel
        const [questions, folders] = await Promise.all([
            Question.find({ createdBy: userId, sheetId : id }),
            Folders.find({ createdBy: userId , sheetId : id })
        ]);


        //Build Maps

        // folderId -> questions
        const folderQuestionMap = new Map<string, any[]>();

        questions.forEach((q) => {
            const key = q.folderId?.toString();
            if (!key) return;

            if (!folderQuestionMap.has(key)) {
                folderQuestionMap.set(key, []);
            }
            folderQuestionMap.get(key)!.push(q);
        });

        // parentId -> child folders
        const folderChildMap = new Map<string, any[]>();

        folders.forEach((f) => {
            const parentId = f.parentFolderId?.toString();

            if (parentId) {
                if (!folderChildMap.has(parentId)) {
                    folderChildMap.set(parentId, []);
                }
                folderChildMap.get(parentId)!.push(f);
            }
        });

        // fetch the respective Sheet
        const sheetFormDb = await Sheets.findById(id);

        if(!sheetFormDb){
            const response:basicResponseType = {
                success: false,
                error: "No such sheet exist"
            }
            return res.status(200).json(response);
        }


        //Root Folders
        const rootFolders = folders.filter(
            (fold) => fold.parentFolderId === null
        );


        // Build Tree
        const finalFolders: Folder[] = rootFolders.map((folder) =>
            buildFolder(folder, null, folderChildMap, folderQuestionMap)
        );


        // add parent folder id to all root folders
        const updatedFinalFolders = finalFolders.map((folder)=>{
            return {
                ...folder,
                parentFolderId: sheetFormDb._id.toString()
            }
        })



        // parent folder
        const parentFolder:Folder = {
            id: sheetFormDb._id.toString(),
            name: sheetFormDb.name,
            parentFolderId: null,
            questions:[],
            childFolders: updatedFinalFolders
        }


        // Solved Count
        let solvedQuestionsCount = 0;
        const solvedQuestionsIds: string[] = [];


        questions.forEach((q) => {
            if (q.done) { 
                solvedQuestionsCount++;
                solvedQuestionsIds.push(q._id.toString());
            }
        });

        // Final Response
        const response: getSheetDataResponseType = {
            success: true,
            id: id,
            name: sheetFormDb.name, // replace if you store sheet name
            solvedQuestionsCount: solvedQuestionsCount.toString(),
            solvedQuestionsIds: solvedQuestionsIds,
            Folders: [parentFolder]
        };

        return res.status(200).json(response);

    } catch (err) {
        console.log("Error fetching sheet data", err);

        const response: basicResponseType = {
            success: false,
            error: "Internal Server Error"
        };

        return res.status(500).json(response);
    }
};