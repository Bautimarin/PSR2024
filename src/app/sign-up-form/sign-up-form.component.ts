import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import {PrusciPlusService} from '../PrusciPlus.Service';
import { PostableUser } from '../User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css'
})



export class SignUpFormComponent {
  constructor(private service:PrusciPlusService,  private router: Router) { }

  form = new FormGroup({
    email: new FormControl<string>(''),
    username: new FormControl<string>(''),
    password: new FormControl<string>(''),
    repeatPassword: new FormControl<string>('')
  }
  );

  onSubmit() {
    try{
      let user : PostableUser | undefined = this.convertirRegistro();
      if (user === undefined) throw new Error();
      let user1 = {
        "user":user
      }
      let success : boolean = this.service.postUser(user1);
      if (success) this.router.navigate(['/home']);
    }catch(err : any){
      console.error(err);
    }                                                                                                                                                                                                                                  
  }

  convertirRegistro() : PostableUser | undefined {
    if (this.form.value.password !== this.form.value.repeatPassword) {alert("contraseña incorrecta");return;}
    let user : PostableUser = {
      userName: this.form.value.username as unknown as string,
      email: this.form.value.email as unknown as string,
      level: {
        number: 0,
        expValue: 0
      },
      password : this.form.value.password as unknown as string,
      isSuperUser: false
    }
    return user 
  }

}
