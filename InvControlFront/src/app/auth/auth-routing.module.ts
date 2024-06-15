import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayouthComponent } from './auth-layouth/auth-layouth.component';
import { LoginPageComponent } from './page/login-page/login-page.component';



const routes: Routes = [
  {
    path: '',
    component:AuthLayouthComponent,
    children: [
      {path: 'login', component: LoginPageComponent},
      {path: '**', redirectTo: 'login'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
