
import {PrusciPlusService} from "./PrusciPlus.Service";
import { IMovie } from "./Peli";
import { HttpClient } from "@angular/common/http";
import { GetMovieResponse } from "./definitions/ServerResponse";
export class Searcher {
    private input : string;
    private service : PrusciPlusService;
    private fullSetOfMovies : IMovie[];
    constructor(HttpClient: HttpClient) {
        this.input = "";
        this.service = new PrusciPlusService(HttpClient);
        this.fullSetOfMovies = [];
        this.load();

    }
    private load() : void {
        let movieResponse : GetMovieResponse = this.service.getAllFilms();
        if (!movieResponse.success) {console.log("error"); return;}
        movieResponse.film.subscribe((data : any) => {
            this.fullSetOfMovies = data.films;
        });
    }
    public setInput(input : string) {
        this.input = input;
    }
    public getInput() : string {
        return this.input;
    }
    public async search() : Promise<IMovie[]> {
        /*
        Busca las peliculas que contengan el texto ingrd 
        en caso que el input sea vacio, retorna un array de todo lo que haya
        params: None (usa el this.input)
        returns: Array de IPeli
        */
        if (this.input === "") return this.fullSetOfMovies;
        return this.fullSetOfMovies.filter((film : IMovie) => film.name.toLowerCase().includes(this.input));


    }
}
export default Searcher;