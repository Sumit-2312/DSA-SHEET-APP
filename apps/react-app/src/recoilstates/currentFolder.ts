import type { folders } from '@repo/types/sheet/sheetContentType';
import {atom} from 'recoil';


export const currentFolder = atom<folders|null>({
    key: "currentFolder",
    default: null
});