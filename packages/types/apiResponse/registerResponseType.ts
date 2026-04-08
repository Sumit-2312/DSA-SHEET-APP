import type {basicResponseType} from './basicResponseType.ts';
export interface registerResponseType extends basicResponseType {
    redirect?: string,
    message?: string // this will be sent if no error is there
}