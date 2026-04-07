import type { basicResponseType } from "./basicResponseType";

export  interface loginResponseType extends basicResponseType{
    token?: string,
    isVerified: boolean,
    email: string
}