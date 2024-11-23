import { Component } from '@angular/core';
import { IMovie } from '../Peli';
import { ObjectId } from 'mongodb';
import { FormGroup, FormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IComments } from '../IComment';
import { PrusciPlusService } from '../PrusciPlus.Service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-film-content',
  standalone: true,
  imports: [FormsModule,CommonModule, ReactiveFormsModule],
  templateUrl: './film-content.component.html',
  styleUrl: './film-content.component.css'
})
 export class FilmContentComponent {
  public film : IMovie = {
    _id: 1 as unknown as ObjectId,
    name: "Click",
    comments : [
      {
        "id": 1 as unknown as ObjectId,
        "username": "false user",
        "opinion": "Muy buena" 
      }],
    categoria: [],
    actors : [],
    image : "",
    video: ""
  };
  public commentStates : boolean[] = [];
  constructor(private service : PrusciPlusService, private route: ActivatedRoute) {}
  public form : FormGroup = new FormGroup({
    comment: new FormControl<string>("")
  });
  public editForm : FormGroup = new FormGroup({
    modifiedComment: new FormControl<string>("")
  });
  async ngOnInit() {
   await this.route.snapshot.data['film'].film.subscribe((data : any) => {
      let parsedData : IMovie = data.film as IMovie;
      this.film = {
        _id: parsedData._id,
        name: parsedData.name,
        comments: parsedData.comments,
        categoria: parsedData.categoria,
        actors: parsedData.actors,
        image: parsedData.image,
        video: parsedData.video
      }
      this.film.comments.forEach(() => {
        this.commentStates.push(false);
      });
    });
  }
  private asignIDToComment() : ObjectId {
    let id : number = 0;
    let isZeroValid: boolean = false;
    let arrayOfIds : number[] = [... this.film.comments.map((comment : IComments) => comment.id as unknown as number)];
    arrayOfIds.sort();
    for (let i : number = 0; i < arrayOfIds.length; i++) {
      if (arrayOfIds[i] != i) {
        if(i == 0) isZeroValid = true;
        id = i;
        break;
      }
    }
    if (id == 0 && !isZeroValid) id = arrayOfIds.length;
    return (id.toString()) as unknown as ObjectId;
  }

  private buildNewComment(comment : string) : IComments{
    let newComment : IComments = {
      id : this.asignIDToComment(),
      username : localStorage.getItem('userName') as string,
      opinion : comment
    }
    return newComment;
  }
  public onPostComment() : void {
    let comment : string = this.form.value.comment;
    if (comment === "") return;
    this.film.comments.push(this.buildNewComment(comment));
    this.commentStates.push(false);
    this.service.modifyFilm(this.film);
  }
  public editComment(id : ObjectId) : void {
    for( let i : number = 0; i < this.film.comments.length; i++) {
      if (this.film.comments[i].id == id && this.film.comments[i].username == localStorage.getItem('userName')) {
        this.film.comments[i].opinion = this.editForm.value.modifiedComment;
        this.service.modifyFilm(this.film);
      }
    }
  }
  public getCurrentState(id : ObjectId) : boolean {
    return this.commentStates[id as unknown as number];
  }
  public onEditButtonClicked(id : ObjectId) : void {
    for (let i : number = 0; i < this.film.comments.length; i++) {
      if (this.film.comments[i].id == id && this.film.comments[i].username == localStorage.getItem('userName')) {
        if(this.commentStates[id as unknown as number] == true) {this.editComment(id);}
        this.commentStates[id as unknown as number] = !this.commentStates[id as unknown as number];
      }
    }

  }
  public onDeleteComment(id : ObjectId) : void {
    for (let i : number = 0; i < this.film.comments.length; i++) {
      if (this.film.comments[i].id == id && this.film.comments[i].username == localStorage.getItem('userName')) {
        this.film.comments.splice(i, 1);
        this.commentStates.splice(i, 1);
        this.service.modifyFilm(this.film);
      }
    }
  }  
}
