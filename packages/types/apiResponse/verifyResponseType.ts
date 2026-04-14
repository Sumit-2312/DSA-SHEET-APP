import type { basicResponseType } from "./basicResponseType.js";

export interface verifyResponseType extends basicResponseType {
    token?: string,
    redirect?: string
}