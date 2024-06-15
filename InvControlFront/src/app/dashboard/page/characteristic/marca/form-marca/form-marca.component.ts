import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MarcaService } from 'src/app/dashboard/services/marca/marca.service';

@Component({
  selector: 'app-form-marca',
  templateUrl: './form-marca.component.html',
  styleUrls: ['./form-marca.component.css']
})
export class FormMarcaComponent {
  formulario!: FormGroup;
  titulo: string = '';

  constructor(
    private dialogRef: MatDialogRef<FormMarcaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private entidadMarca: MarcaService
  ) {
    this.titulo = data ? 'EDITAR' : 'AGREGAR';
  }

  ngOnInit(): void {
    this.cargarFormulario();
  }

  cargarFormulario() {
    this.formulario = new FormGroup({
      mar_id: new FormControl(this.data?.mar_id),
      mar_nombre: new FormControl(this.data ? this.data.mar_nombre : '', Validators.required),
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
