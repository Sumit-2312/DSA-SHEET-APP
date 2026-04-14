import type {basicResponseType} from './basicResponseType.js'
import type { snippetType } from './snippetsResponseType.js'
export interface addSnippetResponseType extends basicResponseType {
    redirect?: string,
    snippet?: snippetType
}