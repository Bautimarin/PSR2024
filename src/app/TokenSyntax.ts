import { ObjectId } from "mongodb"

export interface IToken {
    "success": boolean,
    "data": Data
}

type Data = {
    "userId" : ObjectId
    "email": string
    "token" : string
}