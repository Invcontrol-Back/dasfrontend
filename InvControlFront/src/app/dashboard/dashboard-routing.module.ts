import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayouthComponent } from './dashboard-layouth/dashboard-layouth.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { UserPageComponent } from './page/user-page/user-page.component';
import { LayoutInventarioComponent } from './page/inventario/layout-inventario/layout-inventario.component';
import { InventarioRoutingModule } from './page/inventario/inventario-routing.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayouthComponent,
    children: [
      {path: 'home', component: HomePageComponent},
      {path: 'user', component: UserPageComponent},
     {
        path: 'inv',
        loadChildren: () => import('./page/inventario/inventario.module').then(m => m.InventarioModule)
      },
      {
        path: '', redirectTo:'home', pathMatch: 'full'
      }
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
