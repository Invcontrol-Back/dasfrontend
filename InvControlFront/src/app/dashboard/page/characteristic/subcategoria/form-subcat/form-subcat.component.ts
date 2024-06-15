import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriaService } from 'src/app/dashboard/services/categoria/categoria.service';
import { SubcategoriaService } from 'src/app/dashboard/services/subcategoria/subcategoria.service';

@Component({
  selector: 'app-form-subcat',
  templateUrl: './form-subcat.component.html',
  styleUrls: ['./form-subcat.component.css']
})
export class FormSubcatComponent {
  formulario!: FormGroup;
  titulo: string = '';
  dataCategoria:any[] = []

  constructor(
    private dialogRef: MatDialogRef<FormSubcatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private entidadCategoria: CategoriaService,
   
  ) {
    this.titulo = data ? 'EDICIÓN' : 'NUEVO';
    this.loadCategorias();
  }

  ngOnInit(): void {
    this.cargarFormulario();
    
  }

  cargarFormulario() {
    this.formulario = new FormGroup({
      det_cat_id: new FormControl(this.data?.det_cat_id),
      det_cat_nombre: new FormControl(this.data ? this.data.det_cat_nombre : '', Validators.required),
      det_cat_cat: new FormControl(this.data ? this.data.det_cat_cat : '', Validators.required),
    });
  }

  loadCategorias(){
    this.entidadCategoria.loadCategorias().subscribe(data => {
      this.dataCategoria = data
    },error => {
      //console.log(error)
    })
  }

  grabar() {
    const form = this.formulario.getRawValue();
    this.dialogRef.close(form);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
