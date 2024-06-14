import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriaService } from 'src/app/dashboard/services/categoria/categoria.service';

@Component({
  selector: 'app-form-cat',
  templateUrl: './form-cat.component.html',
  styleUrls: ['./form-cat.component.css']
})
export class FormCatComponent {
  formulario!: FormGroup;

  titulo: string = '';

  tipoBienOptions: string[] = ['TECNOLOGICO', 'SOFTWARE', 'INMOBILIARIO'];

  constructor(
    private dialogRef: MatDialogRef<FormCatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private entidadCategoria: CategoriaService
  ) {
    this.titulo = data ? 'EDITAR' : 'AGREGAR';
  }

  ngOnInit(): void {
    this.cargarFormulario();
  }

  cargarFormulario() {
    this.formulario = new FormGroup({
      cat_id: new FormControl(this.data?.cat_id),
      cat_nombre: new FormControl(this.data ? this.data.cat_nombre : '', Validators.required),
      cat_tipoBien: new FormControl(this.data ? this.data.cat_tipoBien : '', Validators.required),
    });
  }

  grabar() {
    const form = this.formulario.getRawValue();
    this.dialogRef.close(form);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
