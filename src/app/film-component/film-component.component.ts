import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { IMovie } from '../Peli';
import { ObjectId } from 'mongodb';
import { Router } from '@angular/router';
import path from 'path';
import { get } from 'http';
@Component({
  selector: 'app-film-component',
  standalone: true,
  imports: [],
  templateUrl: './film-component.component.html',
  styleUrl: './film-component.component.css'
})
export class FilmComponentComponent implements OnChanges {
  @Input() film : IMovie = {
    _id: -1 as unknown as ObjectId,
    name: "error",
    comments : [],
    categoria: [],
    actors : [],
    image : "",
    video: ""
  };
  constructor(private router : Router) {

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['film'] && changes['film'].currentValue) {
      this.findImageAndVideo();
    }
  }
  public findImageAndVideo(){
    if (this.film.image instanceof String || this.film.video instanceof String){
      if (this.film.name.includes("ñ")){ this.film.name = this.film.name.replace("ñ", "ni");}
      let path: string = "../../assets/" + this.film.name.replace(" ", "") + ".jpg";
      let videoPath : string = "../../assets/" + this.film.name.replace(" ", "") + ".mp4";
      this.film.image = path;
      this.film.video = videoPath;
      console.log("film and video loaded");
      this.getImage();
    }
  }
  private getImage(){
    console.log(path.join(__dirname, "../../assets/" + this.film.name.replace(" ", "") + ".jpg"));
  }

  public onClickFilm () {
    this.router.navigate(["film", this.film._id]);
  }
}
