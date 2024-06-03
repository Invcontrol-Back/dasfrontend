import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriaService } from 'src/app/dashboard/services/categoria/categoria.service';
import { DependenciaService } from 'src/app/dashboard/services/dependencia/dependencia.service';
import { LocalizacionService } from 'src/app/dashboard/services/localizacion/localizacion.service';
import { TecnologicoService } from 'src/app/dashboard/services/tecnologico/tecnologico.service';
import { TipoUbicacionService } from 'src/app/dashboard/services/tipoUbicacion/tipo-ubicacion.service';
import { UsuarioService } from 'src/app/dashboard/services/usuario/usuario.service';


@Component({
  selector: 'app-form-tecnologico',
  templateUrl: './form-tecnologico.component.html',
  styleUrls: ['./form-tecnologico.component.css']
})
export class FormTecnologicoComponent {
  formulario!: FormGroup;

  titulo=''
  dataTipoUbicacion:any[] = []
  dataEncargado:any[] = []
  dataCategoria:any[] = []
  dataDependencia:any[]=[]

  constructor(private refrencia:MatDialogRef<FormTecnologicoComponent>,@Inject(MAT_DIALOG_DATA) public data:any,
private entidadLocalizacion:LocalizacionService,private entidadUsuario:UsuarioService,private entidadCategoria:CategoriaService,
private entidadDependencia:DependenciaService,private entidadTecnologico:TecnologicoService){
   this.titulo=data?'EDICION':'NUEVO'
   this.loadLocalizaciones()
   this.loadUsuarios()
   this.loadCategorias()
   this.loadDependencias()
  }
 ngOnInit(): void {
  this.cargarFormulario();
  if (this.titulo == "EDICION"){
    this.formulario.get('tec_anio_ingreso')?.disable();
    this.formulario.get('tec_codigo')?.disable();
    this.formulario.get('tec_loc')?.disable()
  }else{
    this.formulario.get('tec_anio_ingreso')?.enable();
    this.formulario.get('tec_codigo')?.enable();
    this.formulario.get('tec_loc')?.disable()
  }
 }

 cargarFormulario(){
  this.formulario= new FormGroup({
    tec_id: new FormControl(this.data?.tec_id),
    tec_codigo:new FormControl(this.data ? this.data.tec_codigo:'', Validators.required),
    tec_serie:new FormControl(this.data ? this.data.tec_serie:'', Validators.required),
    tec_modelo:new FormControl(this.data ? this.data.tec_modelo:'', Validators.required),
    tec_marca:new FormControl(this.data ? this.data.tec_marca:'', Validators.required),
    tec_ip:new FormControl(this.data ? this.data.tec_ip:''),
    tec_anio_ingreso:new FormControl(this.data ? this.data.tec_anio_ingreso:'', Validators.required),
    tec_encargado:new FormControl(this.data ? this.data.tec_encargado:'', Validators.required),
    tec_loc:new FormControl(this.data ? this.data.tec_loc:'', Validators.required),
    tec_cat:new FormControl(this.data ? this.data.tec_cat:'', Validators.required),
    tec_dep:new FormControl(this.data ? this.data.tec_dep:'', Validators.required),
  })
 }
  grabar(){
   const form=this.formulario.getRawValue();
   this.refrencia.close(form)    
  }
  
  loadLocalizaciones(){
    this.entidadLocalizacion.loadLocalizaciones().subscribe(data => {
      this.dataTipoUbicacion = data
    },error => {
      console.log(error)
    })
  }

  loadUsuarios(){
    this.entidadUsuario.loadUsuarios().subscribe(data => {
      this.dataEncargado = data
    },error => {
      console.log(error)
    })
  }
  loadCategorias(){
    this.entidadCategoria.loadCategorias().subscribe(data => {
      this.dataCategoria = data
    },error => {
      console.log(error)
    })
  }

  loadDependencias(){
    this.entidadDependencia.loadDependencias().subscribe(data => {
      this.dataDependencia = data
    },error => {
      console.log(error)
    })
  }


}
