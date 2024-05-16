import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayouthComponent } from './dashboard-layouth/dashboard-layouth.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { UserPageComponent } from './page/user-page/user-page.component';

import { InventarioRoutingModule } from './page/inventario/inventario-routing.module';
import { BloquesComponent } from './page/areas/bloques/bloques.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayouthComponent,
    children: [
      {path: 'home', component: HomePageComponent},
      {path: 'user', component: UserPageComponent},
      {path: 'building', component: BloquesComponent},
      {path: 'inventory', loadChildren: () => import ('./page/inventario/inventario.module').then(m=> m.InventarioModule) },
      {path: '', redirectTo:'home', pathMatch:'full'},
    
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes),
    
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
