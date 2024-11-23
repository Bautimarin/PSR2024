import { ObjectId } from "mongodb";
export interface IComments {
    id : ObjectId;
    username : string;
    opinion : string;
}
function isComment (obj : unknown) : boolean {
    return (
        !!obj &&
        typeof obj === "object" &&
        "id" in obj && typeof obj.id === "string" &&
        "username" in obj && typeof obj.username === "string" &&
        "opinion" in obj && typeof obj.opinion === "string"
    );
}
function isEqual(obj1 : IComments, obj2 : IComments) : boolean {
    return obj1.id === obj2.id && obj1.username === obj2.username && obj1.opinion === obj2.opinion;
}
export default {
    isEqual,
    isComment
} as const