
import { PostableUser, UserAuthToken } from "./User";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GetMovieResponse, LogInResponse, MovieData } from "./definitions/ServerResponse";
import { Observable } from "rxjs";
import { IMovie } from "./Peli";
import { IActor } from "./Actor";
@Injectable({
    providedIn: 'root'
})
export class PrusciPlusService {
    private apiUrl : string = "http://localhost:3000/api";

    constructor(private httpClient: HttpClient) {
    }
    private setHeaders(headers : Headers) : boolean {
        headers.set("Authorization", `${localStorage.getItem("Authorization")}`);
        return (localStorage.getItem("Authorization") === null)
    }
    public getAllFilms() :GetMovieResponse {
        let response : GetMovieResponse;
        try{
            const filmsEndPoint : string = this.apiUrl + "/movies";
            let retrievedFilms : Observable<Object> = this.httpClient.get(filmsEndPoint);
            response = {
                success: true,
                film: retrievedFilms as unknown as Observable<MovieData>
            }
        }catch(err : any){
            response = {
                success: false,
                film: null as unknown as Observable<MovieData>
            }
        }
        return response;
    }
    public postUser(user : {"user" : PostableUser}) : boolean {
        let success : boolean = true;
        try{
            const usersEndPoint : string = this.apiUrl + "/users";
            this.httpClient.post(usersEndPoint, user).subscribe(() => {
                console.log("post");
            });
            alert("Usuario creado exitosamente");
        }catch (err : any){
            success = false;
            alert("Error al crear usuario");
        }
        return success;

    }
    public iniciarSesion(user: UserAuthToken) : LogInResponse {
        let success : boolean = true;
        let response : LogInResponse = {
            token: null as unknown as Observable<object>,
            user: null as unknown as Observable<object>
        };
        let retrievedData : Observable<object> | undefined;
        let userRetrievedData : Observable<object> | undefined; 
        try{
            const usersEndPoint : string = this.apiUrl + "/users/login/";
            let postObj : {"user": UserAuthToken} = {
                "user": user
            }
            retrievedData = this.httpClient.post(usersEndPoint, postObj);
            retrievedData.subscribe((data : any) => {
                console.log(data);
            });
            userRetrievedData = this.getOneUser(user.email);
            if (userRetrievedData === undefined) throw new Error("error al obtener usuario");
            response = {
                token : retrievedData,
                user : userRetrievedData,
            }
        }catch (err : any){
            response = {
                token : retrievedData as unknown as Observable<object>,
                user : userRetrievedData as unknown as Observable<object>,
            }
        }
        return response;
    }
    /*
    public iniciarSesion(user: UserAuthToken){
        return this.httpClient.post(this.apiUrl + "/users/login/", {"user":user});
    }*/
    public getOneUser(param : string) : Observable<object> | undefined {
        /*
        Obtiene un usuario en especifico ya sea pasando un id como string o un email
        params: string
        returns: observable con el usuario adentro o undefined si no lo encuentra
        */
        const userEndpoint : string = this.apiUrl + "/users" + `/${param}`;
        let retrievedUserObservable : Observable<object> | undefined = undefined;
        let headers : Headers = new Headers();
        this.setHeaders(headers);
        let options : any = {
            headers: headers
        }
        retrievedUserObservable = this.httpClient.get(userEndpoint, options);
        return retrievedUserObservable;
    }
    public addOneFilm(film : IMovie):void{
        
    }
    public modifyFilm(film : IMovie) : void {
        /*
        Modifica una pelicula en la base de datos
        params: film
        */
       try{
            let putObj : {"film": IMovie} = {
                "film": film
            }
            const filmEndpoint : string = this.apiUrl + "/movies/";
            let headers : Headers = new Headers();
            this.setHeaders(headers);
            let options : any = {
                headers: headers
            }
            this.httpClient.put(filmEndpoint, putObj, options).subscribe((data : any) => {
                console.log(data);
            });
       }catch(err : any){
            console.error(err);
       }

    }
    public async getOneFilm(param : number) : Promise<GetMovieResponse> {
        /*
        Obtiene una pelicula en especifico ya sea pasando un id como string o un email
        params: string
        returns: observable con la pelicula adentro o undefined si no lo encuentra
        */
        let success : boolean = true;
        let movieResponse : GetMovieResponse | undefined = undefined
        try{
            const filmEndpoint : string = this.apiUrl + "/movies" + `/${param}`;
            let retrievedFilmObservable : Observable<object> | undefined = undefined;
            
            retrievedFilmObservable = await this.httpClient.get(filmEndpoint);
            movieResponse = {
                success: success,
                film: retrievedFilmObservable as unknown as Observable<MovieData>
            }
            return movieResponse;
        }catch(_err : any){
            success = false;
            movieResponse = {
                success: success,
                film: null as unknown as Observable<MovieData>
            }
            return movieResponse;
        }
    }
    public getAllActors(){
        const actorsEndPoint : string = this.apiUrl + "/actors";
        let retrievedactors : Observable<Object> = this.httpClient.get(actorsEndPoint);
    }
}