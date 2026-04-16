import {atom} from 'recoil';

export const viewAllSnippetsModalOpen = atom<boolean>({
    key: "viewAllSnippetsModalOpen",
    default: false
})