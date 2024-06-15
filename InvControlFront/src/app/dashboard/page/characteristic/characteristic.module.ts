import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacteristicRoutingModule } from './characteristic-routing.module';
import { MarcaComponent } from './marca/marca.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ShareModule } from '../../share/share.module';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { FormSubcatComponent } from './subcategoria/form-subcat/form-subcat.component';
import { FormMarcaComponent } from './marca/form-marca/form-marca.component';
import { FormCatComponent } from './categoria/form-cat/form-cat.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MarcaComponent,
    CategoriaComponent,
    SubcategoriaComponent,
    FormSubcatComponent,
    FormMarcaComponent,
    FormCatComponent,

  ],
  imports: [
    CommonModule,
    CharacteristicRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    ShareModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule

  ]
})
export class CharacteristicModule { }
