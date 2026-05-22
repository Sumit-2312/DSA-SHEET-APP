import type { Response } from "express";
import type {
  getSheetDataResponseType,
  Question as QuestionType,
  Folder as FolderNormalized
} from "@repo/types/apiResponse/getSheetDataResponseType";
import type { basicResponseType } from "@repo/types/apiResponse/basicResponseType";
import { Folders, Question, Sheets, Users } from "@repo/database/db";


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

    //  Get user
    const userFromDb = await Users.findOne({ email });
    const userId = userFromDb?._id;

    if (!userId) {
      const response: basicResponseType = {
        success: false,
        error: "User not found in database"
      };
      return res.status(400).json(response);
    }

    //  Fetch all data in parallel
    const [questions, folders, sheetFormDb] = await Promise.all([
      Question.find({ createdBy: userId, sheetId: id }),
      Folders.find({ createdBy: userId, sheetId: id }),
      Sheets.findById(id)
    ]);

    if (!sheetFormDb) {
      const response: basicResponseType = {
        success: false,
        error: "No such sheet exist"
      };
      return res.status(404).json(response);
    }

    // ============================
    //  NORMALIZATION STARTS HERE
    // ============================

    const folderMap: Record<string, FolderNormalized> = {};
    const questionMap: Record<string, QuestionType> = {};
    const ActualrootFolders: string[] = []

    // 1. Normalize Questions
    let solvedQuestionsCount = 0;
    const solvedQuestionsIds: string[] = [];

    questions.forEach((q) => {
      const qId = q._id.toString();

      const normalizedQuestion: QuestionType = {
        id: qId,
        title: q.title,
        link: q.link,
        resourceLink: q.resourceLink,
        notes: q.notes,
        platform: q.platform as string,
        difficulty: q.difficulty as "easy" | "medium" | "hard",
        folderId: q.folderId?.toString(),
        sheetId: q.sheetId?.toString(),
        done: q.done
      };

      questionMap[qId] = normalizedQuestion;

      if (q.done) {
        solvedQuestionsCount++;
        solvedQuestionsIds.push(qId);
      }
    });

    // 2. Initialize folders
    folders.forEach((f) => {
      const fId = f._id.toString();

      folderMap[fId] = {
        id: fId,
        name: f.name,
        parentFolderId: f.parentFolderId?.toString() || null,
        sheetId: f.sheetId?.toString(),
        childFolderIds: [],
        questionIds: []
      };
    });

    // 3. Build folder relationships (parent → children)
    folders.forEach((f) => {
      const fId = f._id.toString();
      const parentId = f.parentFolderId?.toString();

      if (parentId && folderMap[parentId]) {
        folderMap[parentId].childFolderIds.push(fId);
      } else {
        ActualrootFolders.push(fId);
      }
    });

    // 4. Attach questions to folders
    questions.forEach((q) => {
      const fId = q.folderId?.toString();
      const qId = q._id.toString();

      if (fId && folderMap[fId]) {
        folderMap[fId].questionIds.push(qId);
      }
    });

    // 5. Create virtual root (sheet as root folder)
    const VirtualRootFolderId = sheetFormDb._id.toString();

    folderMap[VirtualRootFolderId] = {
      id: VirtualRootFolderId,
      name: sheetFormDb.name,
      parentFolderId: null,
      sheetId: VirtualRootFolderId,
      childFolderIds: ActualrootFolders,
      questionIds: []
    };

    // ============================
    // FINAL RESPONSE
    // ============================

    const response: getSheetDataResponseType = {
      success: true,
      sheetDetails: {
        id: VirtualRootFolderId,
        name: sheetFormDb.name
      },
      Folders: folderMap,
      Questions: questionMap,
      rootFolderId: VirtualRootFolderId,
      totalQuestions: questions.length,
      solvedQuestionsCount,
      solvedQuestionsIds
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