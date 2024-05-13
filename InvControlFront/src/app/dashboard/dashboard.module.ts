import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayouthComponent } from './dashboard-layouth/dashboard-layouth.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { UserPageComponent } from './page/user-page/user-page.component';
import { ShareModule } from './share/share.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { InventarioRoutingModule } from './page/inventario/inventario-routing.module';
@NgModule({
  declarations: [
    DashboardLayouthComponent,
    HomePageComponent,
    UserPageComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ShareModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
 

  ]
})
export class DashboardModule { }
