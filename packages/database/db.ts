import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";

/* =========================
   USER SCHEMA (UNCHANGED + EXTENDED)
========================= */
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },  
    password: {
        type: String,
        required: true
    },
    isVerified:{
        type: Boolean,
        required: true
    },
    sheet:{
      type: String,
      enum: ["Fraz","Striver"]
    },
    sheetsProgress: [
      {
        sheetId: {
          type: Schema.Types.ObjectId,
          ref: "Sheets"
        },
        solvedQuestions: [
          {
            type: Schema.Types.ObjectId,
            ref: "Question"
          }
        ]
      }
    ],
    snippets:[
      {
        name: {
          type: String,
          required: true,
          unique: true
        },
        user: {
          type: Schema.Types.ObjectId,
          required: true
        },
        content:{
          type:String,
          required: true,
        },
        language:{
          type: String,
          required: true
        }
      }
    ]
}, { timestamps: true });


/* =========================
   USER OTP SCHEMA (UNCHANGED)
========================= */
const UserOtpSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
}, { timestamps: true });


/* =========================
   SHEET SCHEMA
========================= */
const SheetsSchema = new Schema({
  name: {
    type: String,
    enum: ["Fraz", "Striver","Custom"],
    required: true
  },

  isBase: {
    type: Boolean,
    default: true
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
    default: null
  },

  rootFolders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Folders"
    }
  ]

}, { timestamps: true });


/* =========================
   FOLDER SCHEMA (TREE STRUCTURE)
========================= */
const FolderSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  sheetId: {
    type: Schema.Types.ObjectId,
    ref: "Sheets",
    required: true
  },

  parentFolderId: {
    type: Schema.Types.ObjectId,
    ref: "Folders",
    default: null
  },

  childFolders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Folders"
    }
  ],

  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question"
    }
  ],

  order: {
    type: Number,
    default: 0
  }

}, { timestamps: true });


/* =========================
   QUESTION SCHEMA (BASE + CUSTOM)
========================= */
const QuestionSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  },

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
  },

  platform: {
    type: String,
    enum: ["leetcode", "gfg", "codeforces"]
  },

  sheetId: {
    type: Schema.Types.ObjectId,
    ref: "Sheets",
    required: true
  },

  folderId: {
    type: Schema.Types.ObjectId,
    ref: "Folders",
    required: true
  },

  // ✅ CUSTOM QUESTION SUPPORT
  isCustom: {
    type: Boolean,
    default: false
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
    default: null
  },

  notes: {
    type: String,
    default: ""
  }

}, { timestamps: true });


/* =========================
   MODELS
========================= */
const Question = model('Question', QuestionSchema);
const Users = model('users', UserSchema);
const OTP = model('otp', UserOtpSchema);
const Sheets = model('Sheets', SheetsSchema);
const Folders = model('Folders', FolderSchema);


/* =========================
   EXPORTS
========================= */
export {
    Users,
    OTP,
    Sheets,
    Question,
    Folders
};