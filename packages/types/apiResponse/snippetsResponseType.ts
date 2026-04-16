import type {basicResponseType} from './basicResponseType.js'

export interface snippetType {
    id: String
    name: String,
    user: String,
    content: String,
    language: String
}

export interface snippetResponseType extends basicResponseType {
    snippets?: snippetType[]
}