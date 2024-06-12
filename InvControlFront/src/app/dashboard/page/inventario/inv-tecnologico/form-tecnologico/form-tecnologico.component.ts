import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BloqueService } from 'src/app/dashboard/services/bloque/bloque.service';
import { CategoriaService } from 'src/app/dashboard/services/categoria/categoria.service';
import { DependenciaService } from 'src/app/dashboard/services/dependencia/dependencia.service';
import { LocalizacionService } from 'src/app/dashboard/services/localizacion/localizacion.service';
import { MarcaService } from 'src/app/dashboard/services/marca/marca.service';
import { TecnologicoService } from 'src/app/dashboard/services/tecnologico/tecnologico.service';
import { TipoUbicacionService } from 'src/app/dashboard/services/tipoUbicacion/tipo-ubicacion.service';
import { UbicacionService } from 'src/app/dashboard/services/ubicacion/ubicacion.service';
import { UsuarioService } from 'src/app/dashboard/services/usuario/usuario.service';
import { MatSelectChange } from '@angular/material/select';

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
  dataMarca:any[]=[]
  dataBloque:any[]=[]
  dataUbicacion:any[] =[]

  constructor(private refrencia:MatDialogRef<FormTecnologicoComponent>,@Inject(MAT_DIALOG_DATA) public data:any,
private entidadLocalizacion:LocalizacionService,private entidadUsuario:UsuarioService,private entidadCategoria:CategoriaService,
private entidadDependencia:DependenciaService,private entidadTecnologico:TecnologicoService,private entidadMarca:MarcaService,
private entidadBloque:BloqueService,private entidadUbicacion:UbicacionService){
   this.titulo=data?'EDICION':'NUEVO'
   this.loadLocalizaciones()
   this.loadUsuarios()
   this.loadCategorias()
   this.loadDependencias()
   this.loadMarcas()
   this.loadBloques()
  }
 ngOnInit(): void {
  this.cargarFormulario();
  if (this.titulo == "EDICION"){
    this.formulario.get('tec_anio_ingreso')?.disable();
    this.formulario.get('tec_codigo')?.disable();
  }else{
    this.formulario.get('tec_anio_ingreso')?.enable();
    this.formulario.get('tec_codigo')?.enable();
  }
 }

 cargarFormulario(){
  this.formulario= new FormGroup({
    tec_id: new FormControl(this.data?.tec_id),
    tec_codigo:new FormControl(this.data ? this.data.tec_codigo:'', Validators.required),
    tec_descripcion:new FormControl(this.data ? this.data.tec_descripcion:''),
    tec_serie:new FormControl(this.data ? this.data.tec_serie:'', Validators.required),
    tec_modelo:new FormControl(this.data ? this.data.tec_modelo:'', Validators.required),
    tec_ip:new FormControl(this.data ? this.data.tec_ip:''),
    tec_anio_ingreso:new FormControl(this.data ? this.data.tec_anio_ingreso:'', Validators.required),
    tec_encargado:new FormControl(this.data ? this.data.tec_encargado:'', Validators.required),
    tec_loc:new FormControl(this.data ? this.data.tec_loc:'', Validators.required),
    tec_cat:new FormControl(this.data ? this.data.tec_cat:'', Validators.required),
    tec_dep:new FormControl(this.data ? this.data.tec_dep:'', Validators.required),
    tec_mar:new FormControl(this.data ? this.data.tec_mar:'', Validators.required),
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

  loadBloques(){
    this.entidadBloque.loadBuildings().subscribe(data => {
      this.dataBloque = data
    },error => {
      console.log(error)
    })
  }
  onSelectionChangeBloque(event: MatSelectChange) {
    this.loadFiltroBloques(event.value)
  }
  onSelectionChangeUbicacion(event: MatSelectChange) {
    this.loadFiltroUbicacion(event.value)
  }

  loadFiltroBloques(filtroBloque:any){
    this.entidadUbicacion.loadFilterLocationBuildings(filtroBloque).subscribe(data=>{
      this.dataUbicacion = data
    })
  }

  loadFiltroUbicacion(filtroUbicacion:any){
    this.entidadLocalizacion.loadFilterLocalizacionesLaboratorio(filtroUbicacion).subscribe(data=>{
      this.dataTipoUbicacion = data
    })
  }

  loadMarcas(){
    this.entidadMarca.loadMarcas().subscribe(data => {
      this.dataMarca = data
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
