import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventarioRoutingModule } from './inventario-routing.module';
import { LayoutInventarioComponent } from './layout-inventario/layout-inventario.component';
import { InvTecnologicoComponent } from './inv-tecnologico/inv-tecnologico.component';
import { InvNoTecnologicoComponent } from './inv-no-tecnologico/inv-no-tecnologico.component';
import { InvSoftwareComponent } from './inv-software/inv-software.component';


@NgModule({
  declarations: [
    LayoutInventarioComponent,
    InvTecnologicoComponent,
    InvNoTecnologicoComponent,
    InvSoftwareComponent
  ],
  imports: [
    CommonModule,
    InventarioRoutingModule
  ]
})
export class InventarioModule { }
