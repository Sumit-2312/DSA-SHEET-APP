import {atom}  from 'recoil';
import type {snippetType} from '@repo/types/apiResponse/snippetsResponseType'

export const currentSnippet = atom<snippetType|null>({
    key:"currentSnippets",
    default: null
})