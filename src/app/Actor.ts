import { ObjectId } from "mongodb";
export interface IActor {
    _id: ObjectId;
    nombreActor: string;
}
function isActor(arg: unknown): boolean {
    return !!arg &&
        typeof(arg) === "object" && 
        "_id" in arg && typeof(arg._id) === "string" &&
        "nombreActor" in arg && typeof(arg.nombreActor) === "string";
}
function isEqual(obj1: IActor, obj2: IActor): boolean {
    return obj1._id === obj2._id && obj1.nombreActor === obj2.nombreActor;
}
export default {
    isActor,
    isEqual
} as const;