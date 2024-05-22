import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutInventarioComponent } from './layout-inventario/layout-inventario.component';
import { InvTecnologicoComponent } from './inv-tecnologico/inv-tecnologico.component';
import { InvNoTecnologicoComponent } from './inv-no-tecnologico/inv-no-tecnologico.component';
import { InvSoftwareComponent } from './inv-software/inv-software.component';
import { DashboardLayouthComponent } from '../../dashboard-layouth/dashboard-layouth.component';
import { InvComponentesComponent } from './inv-componentes/inv-componentes.component';

const routes: Routes = [
  {path: '', component:DashboardLayouthComponent,
    children: [
      {path: 'tech', component: InvTecnologicoComponent},
      {path: 'notech', component: InvNoTecnologicoComponent},
      {path: 'software', component:InvSoftwareComponent},
      {path: 'component', component:InvComponentesComponent},
      {path: '', redirectTo:'tech', pathMatch:'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
