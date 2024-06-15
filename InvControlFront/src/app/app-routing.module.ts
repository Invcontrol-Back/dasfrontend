import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { cguardGuard } from './guard/cguard.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), //canActivate: [cguardGuard]
  },
  {
    path: '', redirectTo: 'auth/login', pathMatch: 'full'
  },
  { path: '**', redirectTo: 'auth/login', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
