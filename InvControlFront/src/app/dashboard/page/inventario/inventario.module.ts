import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventarioRoutingModule } from './inventario-routing.module';
import { LayoutInventarioComponent } from './layout-inventario/layout-inventario.component';

import { InvNoTecnologicoComponent } from './inv-no-tecnologico/inv-no-tecnologico.component';
import { InvSoftwareComponent } from './inv-software/inv-software.component';
import { ShareModule } from '../../share/share.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from '../../dashboard.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { InvComponentesComponent } from './inv-componentes/inv-componentes.component';

import { InvTecnologicoComponent } from './inv-tecnologico/inv-tecnologico.component';

import {MatCheckboxModule} from '@angular/material/checkbox';
import { ModalComponenteComponent } from './shared/modal-componente/modal-componente.component';
import { ModalTrasferenciaComponent } from './shared/modal-trasferencia/modal-trasferencia.component';
import { ModalTableComponenteComponent } from './shared/modal-table-componente/modal-table-componente.component';
import { MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatDialogModule} from '@angular/material/dialog';
import { FormTecnologicoComponent } from './inv-tecnologico/form-tecnologico/form-tecnologico.component';
import { ModalRepotenciaComponent } from './shared/modal-repotencia/modal-repotencia.component';



@NgModule({
  declarations: [
    LayoutInventarioComponent,
    
    InvNoTecnologicoComponent,
    InvSoftwareComponent,
    InvComponentesComponent,
    InvTecnologicoComponent,
    ModalComponenteComponent,
    ModalTrasferenciaComponent,
    ModalTableComponenteComponent,
    FormTecnologicoComponent,
    ModalRepotenciaComponent,
  ],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    ShareModule,
   MatSidenavModule,
   MatButtonModule,
   MatListModule,
   MatIconModule,
   MatTooltipModule,
   FormsModule,
   MatTableModule,
   MatFormFieldModule,
   MatSelectModule,
   MatCheckboxModule,
   MatInputModule,
   MatCardModule,
   ReactiveFormsModule,
   MatToolbarModule,
   MatDialogModule
   
  ]
})
export class InventarioModule { }
