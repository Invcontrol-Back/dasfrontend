import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareRoutingModule } from './share-routing.module';
import { SideVarComponent } from './side-var/side-var.component';
import { NavVarComponent } from './nav-var/nav-var.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    SideVarComponent,
    NavVarComponent,
    

  ],
  imports: [
    CommonModule,
    ShareRoutingModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule

  ],
  exports: [
    SideVarComponent,
    NavVarComponent,
    MatListModule,
    MatIconModule, 
    MatExpansionModule

  ]
})
export class ShareModule { }
