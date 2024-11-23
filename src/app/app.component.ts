import { booleanAttribute, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Searcher from './Searcher';
import { IMovie } from './Peli';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HammerModule } from '@angular/platform-browser';
import { IgxCarouselModule } from 'igniteui-angular';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterLink, RouterLinkActive, HammerModule, IgxCarouselModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'app';
  private sercher : Searcher;
  public input : string;
  public films : IMovie[];
  constructor(httpClient: HttpClient) {
    this.input = "";
    this.films = [];
    this.sercher = new Searcher(httpClient);
  }
  async onChange() : Promise<void> {
    this.sercher.setInput(this.input);
    this.films = await this.sercher.search();
  }
  public onLogoClicked() : void {
    if(localStorage.getItem("Authorization") === null || localStorage.getItem("Authorization") === undefined){
      alert("Inicie sesión para acceder a esta funcionalidad");
    }else{
      window.location.href = "/home";
    }
  }
  public isAdmin() : void{
    let isAdmin : boolean = Boolean(localStorage.getItem("Admin"))
    console.log("is admin equals to: ", isAdmin)
  }
}
