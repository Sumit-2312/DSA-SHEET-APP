import { Types } from "mongoose";
import { Users, Sheets, Folders, Question } from '@repo/database/db';

/**
 * Build complete sheet tree for a user
 */
export const getSheetTree = async (
  email: string,
  sheetName: "Fraz" | "Striver"
) => {
  try {
    /* =========================
       1. GET USER
    ========================= */
    const user = await Users.findOne({email}).lean();
    if (!user) {
      throw new Error("User not found");
    }

    /* =========================
       2. GET SHEET
    ========================= */
    const sheet = await Sheets.findOne({ name: sheetName }).lean();
    if (!sheet) {
      throw new Error("Sheet not found");
    }

    const sheetId = sheet._id;

    /* =========================
       3. GET ALL DATA (PARALLEL 🔥)
    ========================= */
    const [folders, questions] = await Promise.all([
      Folders.find({ sheetId }).lean(),
      Question.find({ sheetId }).lean()
    ]);

    /* =========================
       4. GET USER PROGRESS
    ========================= */
    const progress = user.sheetsProgress?.find(
      (s: any) => s.sheetId.toString() === sheetId.toString()
    );

    const solvedSet = new Set(
      progress?.solvedQuestions?.map((id: Types.ObjectId) =>
        id.toString()
      ) || []
    );

    /* =========================
       5. CREATE FOLDER MAP
    ========================= */
    const folderMap = new Map();

    folders.forEach((folder: any) => {
      folderMap.set(folder._id.toString(), {
        _id: folder._id,
        name: folder.name,
        parentFolderId: folder.parentFolderId,
        order: folder.order,

        children: [],
        questions: []
      });
    });

    /* =========================
       6. ATTACH QUESTIONS
    ========================= */
    questions.forEach((q: any) => {
      const folder = folderMap.get(q.folderId.toString());

      if (folder) {
        folder.questions.push({
          _id: q._id,
          title: q.title,
          difficulty: q.difficulty,
          link: q.link,
          platform: q.platform,

          isSolved: solvedSet.has(q._id.toString()),
          isCustom: q.isCustom,
          notes: q.notes
        });
      }
    });

    /* =========================
       7. BUILD TREE 🌳
    ========================= */
    const tree: any[] = [];

    folders.forEach((folder: any) => {
      const current = folderMap.get(folder._id.toString());

      if (folder.parentFolderId) {
        const parent = folderMap.get(
          folder.parentFolderId.toString()
        );
        if (parent) {
          parent.children.push(current);
        }
      } else {
        tree.push(current);
      }
    });

    /* =========================
       8. SORT (IMPORTANT FOR UI)
    ========================= */
    const sortTree = (nodes: any[]) => {
      nodes.sort((a, b) => a.order - b.order);

      nodes.forEach((node) => {
        node.questions.sort((a: any, b: any) =>
          a.title.localeCompare(b.title)
        );

        if (node.children.length > 0) {
          sortTree(node.children);
        }
      });
    };

    sortTree(tree);

    /* =========================
       9. FINAL RESPONSE
    ========================= */
    return {
      sheet: sheet.name,
      tree
    };

  } catch (error) {
    console.error("Error building sheet tree:", error);
    throw error;
  }
};
