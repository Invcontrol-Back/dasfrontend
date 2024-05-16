import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareRoutingModule } from './share-routing.module';
import { SideVarComponent } from './side-var/side-var.component';
import { NavVarComponent } from './nav-var/nav-var.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

import {MatExpansionModule} from '@angular/material/expansion';

import { TableComponent } from './table/table.component';
import {MatTableModule} from '@angular/material/table';
import { ContainerComponent } from './container/container.component';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    SideVarComponent,
    NavVarComponent,
    TableComponent,
    ContainerComponent,


  ],
  imports: [
    CommonModule,
    ShareRoutingModule,
    MatListModule,
    MatIconModule,

    MatExpansionModule,


    MatTableModule,
    MatCardModule

  ],
  exports: [
    SideVarComponent,
    NavVarComponent,
    MatListModule,

    MatIconModule, 
    MatExpansionModule,


    ContainerComponent,
    TableComponent

  ]
})
export class ShareModule { }
