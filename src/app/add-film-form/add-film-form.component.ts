import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { IMovie } from '../Peli';
import { ObjectId } from 'mongodb';
import { PrusciPlusService } from '../PrusciPlus.Service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import {IActor} from '../Actor';

@Component({
  selector: 'app-add-film-form',
  templateUrl: './add-film-form.component.html',
  styleUrls: ['./add-film-form.component.css'],
  standalone: true,
  imports: [FormsModule,CommonModule, ReactiveFormsModule, RouterLink,MatSelectModule],
})

export class AddFilmFormComponent {
  public filmForm: FormGroup;
  public selectedVideo: File | null = null;
  public selectedImageFileName: string | null = null;
  public selectedImage: string | ArrayBuffer | null | undefined = null;
  public actors: IActor[] = [];

  constructor(private service: PrusciPlusService) {
    this.filmForm = new FormGroup({
      name: new FormControl('', Validators.required),
      categoria: new FormControl(''),
      actors: new FormControl(''),
      image: new FormControl('', Validators.required),
      video: new FormControl('', Validators.required)
    });
  }



  onFileSelected(event: Event, type: 'image' | 'video'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (type === 'image') {
        const file = input.files[0];
        this.selectedImageFileName = file.name
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedImage = e.target?.result;
        };
        reader.readAsDataURL(file);

      } else if (type === 'video') {
        this.selectedVideo = input.files[0];
      }
    }
  }

  onSubmit(): void {
    try{
      if (this.filmForm.valid && this.selectedImage && this.selectedVideo) {
        const newFilm: IMovie = {
          _id: 4 as unknown as ObjectId,
          name: this.filmForm.value.name,
          comments: [],
          categoria: this.filmForm.value.categoria.split(','),
          actors: this.filmForm.value.actors.split(','),
          image: this.selectedImageFileName!,
          video: this.selectedVideo.name
        };
  
        // Aquí puedes agregar la lógica para subir los archivos al servidor si es necesario
  
        this.service.addOneFilm(newFilm);
      }
    }catch(err : any){
      console.log(err)
    }
  }
}
