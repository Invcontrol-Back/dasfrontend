import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventarioRoutingModule } from './inventario-routing.module';
import { InvTecnologicoComponent } from './inv-tecnologico/inv-tecnologico.component';
import { InvNoTecnologicoComponent } from './inv-no-tecnologico/inv-no-tecnologico.component';
import { InvSoftwareComponent } from './inv-software/inv-software.component';
import { DashboardLayouthComponent } from '../../dashboard-layouth/dashboard-layouth.component';
import { LayoutInventarioComponent } from './layout-inventario/layout-inventario.component';


@NgModule({
  declarations: [
    InvTecnologicoComponent,
    InvNoTecnologicoComponent,
    InvSoftwareComponent,
    LayoutInventarioComponent
  ],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    

  ],
  exports: [
    InvNoTecnologicoComponent,
    InvSoftwareComponent,
    InvTecnologicoComponent,
    InventarioModule,
    LayoutInventarioComponent
    

  ]
})
export class InventarioModule { }
