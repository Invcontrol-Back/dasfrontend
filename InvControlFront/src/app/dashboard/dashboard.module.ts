import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayouthComponent } from './dashboard-layouth/dashboard-layouth.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { UserPageComponent } from './page/user-page/user-page.component';
import { ShareModule } from './share/share.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule, MatSelectionList} from '@angular/material/list';
import { InventarioRoutingModule } from './page/inventario/inventario-routing.module';
import { BloquesComponent } from './page/areas/bloques/bloques.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  declarations: [
    DashboardLayouthComponent,
    HomePageComponent,
    UserPageComponent,
    BloquesComponent,
    


  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ShareModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    InventarioRoutingModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatOptionModule
  
  ],
  exports:[
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class DashboardModule { }
