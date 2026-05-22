import {atom} from 'recoil';

const renameFolderState = atom({
    key:"renameFolderState",
    default:{
        isOpen:false,
        folderId:"",
        folderName:""
    }
})

export {renameFolderState}