import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvTecnologicoComponent } from './inv-tecnologico/inv-tecnologico.component';
import { InvNoTecnologicoComponent } from './inv-no-tecnologico/inv-no-tecnologico.component';
import { InvSoftwareComponent } from './inv-software/inv-software.component';
import { DashboardLayouthComponent } from '../../dashboard-layouth/dashboard-layouth.component';
import { LayoutInventarioComponent } from './layout-inventario/layout-inventario.component';

const routes: Routes = [
  { path: '',
   component:LayoutInventarioComponent,
    children:[
      { path: 'tecnologico', component: InvTecnologicoComponent},
      { path: 'notecnologico', component: InvNoTecnologicoComponent},
      {path: 'software', component: InvSoftwareComponent},
      {path:'', redirectTo: 'tecnologico', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
