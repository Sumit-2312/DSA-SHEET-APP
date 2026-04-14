import type {basicResponseType} from './basicResponseType.js'

export interface snippetType {
    name: String,
    user: String,
    content: String
}

export interface snippetResponseType extends basicResponseType {
    snippets?: snippetType[]
}