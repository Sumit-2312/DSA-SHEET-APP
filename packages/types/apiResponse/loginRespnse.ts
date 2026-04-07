import type { basicResponse } from "./basicResponse";

export  interface loginResponse extends basicResponse{
    token?: string
}