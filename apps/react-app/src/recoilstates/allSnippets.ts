import {atom}  from 'recoil';
import type {snippetType} from '@repo/types/apiResponse/snippetsResponseType'



export const allSnippets = atom<snippetType[]|[]>({
    key:"allSnippets",
    default: []
})