import { Component} from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import {PrusciPlusService} from '../PrusciPlus.Service';
import { UserAuthToken } from '../User';
import { LogInResponse } from '../definitions/ServerResponse';
import { ServerResponse } from '../definitions/ServerResponse';

@Component({
  selector: 'app-log-in-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './log-in-form.component.html',
  styleUrl:'./log-in-form.component.css',
})

export class LogInFormComponent{
  public userAuthObj : UserAuthToken;
   
  public formLogin = new FormGroup({
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
  }); 
  constructor(private service:PrusciPlusService, private router: Router) { 
    this.userAuthObj = {email: '', password: ''};
    }
  public onSignUp() : void{
    this.router.navigate(['/signup']);
  }
  public async onSubmit() { 
    try{
      let user : UserAuthToken | undefined = this.convertirRegistro();
      if (user === undefined) throw new Error();
      let user1 : {"user":UserAuthToken}= {
        "user":user
      }
      let response : LogInResponse = this.service.iniciarSesion(user1.user);
      try {
        response.token.subscribe((data : any) => {
          if(!data.success) {alert("Error al iniciar sesión"); return;}
          let parsedData : ServerResponse = data as ServerResponse;
          localStorage.setItem('Authorization', parsedData.data.token);
          response.user.subscribe((data : any) => {
            localStorage.setItem('userName', data.user.userName);
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('level', data.user.level);
            localStorage.setItem('Admin', data.user.isSuperUser)
            this.router.navigate(['/home']);
          });
        });
      }catch(err : any){
        throw new Error("Error al iniciar sesión");
      }

    }catch(err : any){
      alert("Error al iniciar sesión");
    }                                                                                                                                                                                                                                 
  }

  public convertirRegistro() {
      let user : UserAuthToken = {
      email: this.formLogin.value.email as unknown as string,
      password : this.formLogin.value.password as unknown as string
    }
    return user 
  }
}
