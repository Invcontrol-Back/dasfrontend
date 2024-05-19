import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayouthComponent } from './auth-layouth/auth-layouth.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AuthLayouthComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatSidenavModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ]
})
export class AuthModule { }
