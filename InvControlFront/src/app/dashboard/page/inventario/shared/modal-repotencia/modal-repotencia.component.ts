import { Component,Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DependenciaService } from 'src/app/dashboard/services/dependencia/dependencia.service';
import { MarcaService } from 'src/app/dashboard/services/marca/marca.service';
import { SubcategoriaService } from 'src/app/dashboard/services/subcategoria/subcategoria.service';

@Component({
  selector: 'app-modal-repotencia',
  templateUrl: './modal-repotencia.component.html',
  styleUrls: ['./modal-repotencia.component.css']
})
export class ModalRepotenciaComponent {

  dataDependencia:any[]=[]
  dataSubcategoria:any[]=[]
  dataMarca:any[]=[]
  titulo=''
  formulario!:FormGroup
  tipos: string[] = ['ACTIVO', 'INACTIVO'];

  constructor(private refrencia:MatDialogRef<ModalRepotenciaComponent>,private entidadDependencia:DependenciaService,
    private entidadSubCategoria:SubcategoriaService,private entidadMarca:MarcaService,@Inject(MAT_DIALOG_DATA) public data:any){
   this.titulo=data?'EDICION':'NUEVO'
  }

  ngOnInit(): void {
    this.loadDependencias()
    this.loadSubCategorias()
    this.cargarFormulario();
    this.loadMarcas()
  }
  grabar(){
   const form=this.formulario.getRawValue();
   this.refrencia.close(form)    
  }

  cargarFormulario(){
   this.formulario= new FormGroup({
    com_codigo_uta : new FormControl (this.data ? this.data.com_codigo_uta:'', Validators. required),
    com_mar : new FormControl (this.data ? this.data.com_mar:'', Validators. required),
    com_modelo : new FormControl (this.data ? this.data.com_modelo:'', Validators. required),
    com_serie : new FormControl (this.data ? this.data.com_serie:'', Validators. required),
    com_anio_ingreso : new FormControl (this.data ? this.data.com_anio_ingreso:'', Validators. required),
    com_caracteristica : new FormControl (this.data ? this.data.com_caracteristica:'', Validators. required),
    com_det_cat : new FormControl (this.data ? this.data.com_det_cat:'', Validators. required),
    com_dep : new FormControl (this.data ? this.data.com_dep:'', Validators. required),
    com_estado : new FormControl (this.data ? this.data.com_estado:'', Validators. required),
    det_tec_descripcion_repotencia : new FormControl (this.data ? this.data.det_tec_descripcion_repotencia:'', Validators. required),
   })
  }

  loadDependencias(){
    this.entidadDependencia.loadDependencias().subscribe(data => {
      this.dataDependencia = data
    },error => {
      console.log(error)
    })
  }

  loadSubCategorias(){
    this.entidadSubCategoria.loadSubCategorias().subscribe(data => {
      this.dataSubcategoria = data
    },error => {
      console.log(error)
    })
  }

  loadMarcas(){
    this.entidadMarca.loadMarcas().subscribe(data => {
      this.dataMarca = data
    },error => {
      console.log(error)
    })
  }

}
