import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";

//   USER SCHEMA 
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
    sheets:[
      {
        type : Schema.Types.ObjectId,
        ref: "Sheets"
      }
    ],
}, { timestamps: true });



// USER OTP SCHEMA
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




// SHEET SCHEMA
const SheetsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  totalQuestions:{
    type: Number,
    default: 0
  },
  solvedQuestions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question"
    }
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
    default: null
  }
}, { timestamps: true });





// FOLDER SCHEMA 
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
  order: {
    type: Number,
    default: 0
  },
  createdBy: {
	  type: Schema.Types.ObjectId,
	  ref: "users"
  }
}, { timestamps: true });




// QUESTION SCHEMA 
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
    done:{
      type:Boolean,
      default: false
    },
    platform: {
      type: String,
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
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
      default: null
    },
    notes: {
      type: String,
      default: ""
    },
    resourceLink:{
      type: String,
      default: ""
    }
}, { timestamps: true });


// Snippets

const SnippetSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  }
}, { timestamps: true });



// MODELS
const Question = model('Question', QuestionSchema);
const Users = model('users', UserSchema);
const OTP = model('otp', UserOtpSchema);
const Sheets = model('Sheets', SheetsSchema);
const Folders = model('Folders', FolderSchema);
const Snippet = model('Snippet', SnippetSchema);

// EXPORTS
export {
    Users,
    OTP,
    Sheets,
    Question,
    Folders,
    Snippet
};