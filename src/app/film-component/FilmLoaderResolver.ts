import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PrusciPlusService } from '../PrusciPlus.Service';
import { GetMovieResponse, MovieData } from '../definitions/ServerResponse';

@Injectable({
  providedIn: 'root'
})
export class MovieResolver implements Resolve<GetMovieResponse> {
  constructor(private service: PrusciPlusService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<GetMovieResponse> {
    return await this.service.getOneFilm(+(route.paramMap.get('id') as string));
  }
}

export class ImageResolver implements Resolve<string> {
  constructor(private service: PrusciPlusService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<string> {
    return await this.service.getOneFilm(+(route.paramMap.get('id') as string)).then(async (data : GetMovieResponse) => {
        if (data.success) {
            let path : string = "";
            await data.film.subscribe((peli : MovieData) => {
                path = "../../assets/" + peli.film[0].name.replace(" ", "").replace("ñ","ni") + ".jpg";
                return path;
            });
            return "";
        } else {
            return "";
        }
    });
  }
}

export class VideoResolver implements Resolve<string> {
  constructor(private service: PrusciPlusService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<string> {
    return await this.service.getOneFilm(+(route.paramMap.get('id') as string)).then(async (data : GetMovieResponse) => {
        if (data.success) {
            let path : string = "";
            await data.film.subscribe((peli : MovieData) => {
                path = "../../assets/" + peli.film[0].name.replace(" ", "").replace("ñ","ni") + ".mp4";
                return path;
            });
            return "";
        } else {
            return "";
        }
    });
  }
}   
 