import {atom} from 'recoil';

export const editSheetNameModalOpen = atom({
    key: "editSheetNameModalOpen",
    default: {
        id: "",
        name: "",
        isOpen: false
    }
})