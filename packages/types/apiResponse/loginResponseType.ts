import type { basicResponseType } from "./basicResponseType.ts";

export  interface loginResponseType extends basicResponseType{
    token?: string,
    isVerified: boolean,
    email: string,
    message?: string
}