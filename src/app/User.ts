// debe cambiarse los atributos 
import { Level } from "./Level";
import { ObjectId } from "mongodb";
export type UserAuthToken = {
    email : string, 
    password : string,
}
export interface IUser {
    _id: ObjectId;
    userName: string;
    email: string;
    level: Level;
    password : string;
    isSuperUser : boolean;
}
export type PostableUser = Omit<IUser, "_id">;

function isUser (user: unknown):boolean {
    /*
    verifica si el dato ingresado es un usuario valido.
    params: user que puede ser cualquier cosa
    returns: boolean
    */
    return user instanceof Object && 'name' in user && 'age' in user && typeof user.name === 'string' && typeof user.age === 'number' && "_id" in user && "isSuperUser" in user;
}

function newUser(params : unknown): IUser | null {
    /*
    crea un nuevo usuario
    params: params que puede ser cualquier cosa
    returns: IUser
    */
    if (isUser(params)){
        return params as IUser;
    }
    return null;
}

export default{
    isUser,
    newUser
} as const;