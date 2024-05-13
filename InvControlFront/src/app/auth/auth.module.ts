import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayouthComponent } from './auth-layouth/auth-layouth.component';
import { LoginPageComponent } from './page/login-page/login-page.component';


@NgModule({
  declarations: [
    AuthLayouthComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
