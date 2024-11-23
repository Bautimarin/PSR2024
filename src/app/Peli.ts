import { ObjectId } from "mongodb";
import {IComments} from "./IComment";
import Comments from "./IComment";
import Actor, { IActor }  from "./Actor";
import Category, {Categoria} from "./Categoria";
import {Level} from "./Level";
export interface IMovie {
    _id: ObjectId;
    name: string;
    comments : IComments[];
    categoria: Categoria[];
    actors : IActor[];
    image : Buffer | string;
    video: Buffer | string;
}

function isMovie(arg: unknown): boolean {

    return !!arg &&
        typeof(arg) === "object" && 
        "_id" in arg && typeof(arg._id) === "string" &&
        "name" in arg && typeof(arg.name) === "string" &&
        "comments" in arg && Array.isArray(arg.comments) &&
        arg.comments.every((comment: unknown) => Comments.isComment(comment)) &&
        "categoria" in arg && Array.isArray(arg.categoria) &&
        arg.categoria.every((cat: unknown) => Category.isValidCategory(cat)) &&
        "image" in arg &&
        "video" in arg &&
        "actors" in arg && Array.isArray(arg.actors) &&
        arg.actors.every((actor: unknown) => Actor.isActor(actor));

}

function addComment(movie: IMovie, comment: IComments): boolean {
    return !movie.comments.push(comment);
}

function isWatchableByUser(_movie: IMovie, _lvl : Level): boolean {
    return true;
}

export default {
    isMovie,
    addComment,
    isWatchableByUser
} as const;