  import { Component } from '@angular/core';
  import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
  import { HttpClient } from '@angular/common/http';
  import Searcher from '../Searcher';
  import { IMovie } from '../Peli';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
import { FilmComponentComponent } from "../film-component/film-component.component";
  @Component({
    selector: 'app-main-index',
    standalone: true,
    imports: [RouterOutlet, CommonModule, FormsModule, RouterLink, RouterLinkActive, FilmComponentComponent],
    templateUrl: './main-index.component.html',
    styleUrl: './main-index.component.css'
  })

  export class MainIndexComponent {
    title = 'app';
    private sercher : Searcher;
    public fotosUrl : string[] = [];
    public currentIndex = 0;
    public input : string;
    public films : IMovie[];


    constructor(httpClient: HttpClient) {
      this.input = "";
      this.films = [];
      this.sercher = new Searcher(httpClient);
      this.fotosUrl = ["../../assets/Click.jpg","../../assets/home2.jpg","../../assets/home3.jpg"];
    }
    async ngOnInit() {
      this.sercher.setInput(this.input);
      this.films = await this.sercher.search();
      console.log(this.films);
    }

    async onChange() : Promise<void> {
      this.sercher.setInput(this.input);
      this.films = await this.sercher.search();
    }
    

    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.fotosUrl.length;
    }

    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.fotosUrl.length) % this.fotosUrl.length;
    }
  }
