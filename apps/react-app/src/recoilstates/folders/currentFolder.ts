
import type { Folder } from '@repo/types/apiResponse/getSheetDataResponseType';
import {atom} from 'recoil';


export const currentFolder = atom<Folder|null>({
    key: "currentFolder",
    default: null
});