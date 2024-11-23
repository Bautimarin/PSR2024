
import { provideRouter, RouterModule, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LogInFormComponent } from './log-in-form/log-in-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import {PrusciPlusService} from './PrusciPlus.Service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient } from '@angular/common/http';

NgModule({
  declarations: [
    AppComponent,
    LogInFormComponent,
    SignUpFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClient,
    RouterModule.forRoot(routes)
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})

export const appConfig ={
  imports: [BrowserModule],
  declarations: [AppComponent, LogInFormComponent, SignUpFormComponent],
  bootstrap: [AppComponent],
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    { provide: PrusciPlusService}, provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync()
  ],
}