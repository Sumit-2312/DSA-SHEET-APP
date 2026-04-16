import {atom} from 'recoil';

export const editSnippetModalOpen = atom<boolean>({
    key:"editSnippetModalOpen",
    default: false
})