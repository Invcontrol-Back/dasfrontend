import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MetaDataColumn } from '../../../share/interfaces/metacolumn.interface';
import { InmobiliarioService } from 'src/app/dashboard/services/inmobiliario/inmobiliario.service';
import { DependenciaService } from 'src/app/dashboard/services/dependencia/dependencia.service';
import { UsuarioService } from 'src/app/dashboard/services/usuario/usuario.service';
import { CategoriaService } from 'src/app/dashboard/services/categoria/categoria.service';
import { MarcaService } from 'src/app/dashboard/services/marca/marca.service';
import { LocalizacionService } from 'src/app/dashboard/services/localizacion/localizacion.service';


@Component({
  selector: 'app-inv-no-tecnologico',
  templateUrl: './inv-no-tecnologico.component.html',
  styleUrls: ['./inv-no-tecnologico.component.css']
})

export class InvNoTecnologicoComponent {
  formulario!: FormGroup;

  modalOpen: boolean = false;
  modalDeleteOpen: boolean = false;
  showButtonCreate: boolean = false;
  showButtonEdit: boolean = false;

  titleText: string = '';

  dataUsuarios: any[] = [];
  dataDependencia:any[] = []
  dataCategoria:any[] = []
  dataMarca:any[]=[]
  dataTipoUbicacion:any[]=[]
  data: any[] = [];
  disableInput: boolean = true;

  metaDataColumns: MetaDataColumn[] = [
    { field: "inm_codigo", title: "CÓDIGO" },
    { field: "inm_serie", title: "SERIE" },
    { field: "inm_modelo", title: "MODELO" },
    { field: "inm_marca", title: "MARCA" },
    { field: "cat_nombre", title: "CATEGORÍA" },
    { field: "dep_nombre", title: "DEPENDENCIA" },
    { field: "usu_nombres", title: "ENCARGADO" },
    { field: "inm_anio_ingreso", title: "AÑO INGRESO" },
  ];

  constructor(private entidadInmueble:InmobiliarioService,private entidadDependencia:DependenciaService,
    private entidadUsuario:UsuarioService,private entidadCategoria:CategoriaService,private entidadMarca:MarcaService,private entidadLocalizacion:LocalizacionService
  ) {
    this.loadInmuebles();
    this.loadUsuarios();
    this.loadDependencia();
    this.loadCategorias()
    this.loadMarcas()
    this.loadLocalizaciones()
  }

  loadInmuebles() {
    this.entidadInmueble.loadInmobiliarios().subscribe( data =>{
      this.data = data
    })
  }

  loadUsuarios() {
    this.entidadUsuario.loadUsuarios().subscribe(data=>{
      this.dataUsuarios = data
    })
  }

  loadDependencia() {
    this.entidadDependencia.loadDependencias().subscribe(data=>{
      this.dataDependencia = data
    })
  }

  loadCategorias() {
    this.entidadCategoria.loadCategorias().subscribe(data=>{
      this.dataCategoria = data
    })
  }

  loadMarcas(){
    this.entidadMarca.loadMarcas().subscribe(data => {
      this.dataMarca = data
    },error => {
      console.log(error)
    })
  }

  loadLocalizaciones(){
    this.entidadLocalizacion.loadLocalizaciones().subscribe(data => {
      this.dataTipoUbicacion = data
    },error => {
      console.log(error)
    })
  }

  openModal(action: string, row: any) {
    if (action === 'crear') {
      this.titleText = 'CREAR INMUEBLE';
      this.cargarFormulario(row)
      this.showButtonCreate = true;
      this.showButtonEdit = false;
      this.disableInput = false
    } else {
      this.titleText = 'ACTUALIZAR INMUEBLE';
      this.cargarFormulario(row)
      this.showButtonCreate = false;
      this.showButtonEdit = true;
      this.disableInput = true

    }
    this.modalOpen = true;
  }

  cargarFormulario(row:any){
    this.formulario= new FormGroup({
      inm_id: new FormControl(row?.inm_id),
      inm_codigo:new FormControl(row ? row.inm_codigo:'', Validators.required),
      inm_cat:new FormControl(row ? row.inm_cat:'', Validators.required),
      inm_dep:new FormControl(row ? row.inm_dep:'', Validators.required),
      inm_serie:new FormControl(row ? row.inm_serie:'', Validators.required),
      inm_modelo:new FormControl(row ? row.inm_modelo:'', Validators.required),
      inm_mar:new FormControl(row ? row.inm_mar:'', Validators.required),
      inm_loc:new FormControl(row ? row.inm_loc:'', Validators.required),
      inm_descripcion:new FormControl(row ? row.inm_descripcion:''),
      inm_encargado:new FormControl(row ? row.inm_encargado:'', Validators.required),
      inm_anio_ingreso:new FormControl(row ? row.inm_anio_ingreso:'', Validators.required),
    })
   }

  closeModal() {
    this.modalOpen = false;
  }

  closeDeleteModal() {
    this.modalDeleteOpen = false;
  }

  openDeleteModal(row: any) {
    this.cargarFormulario(row)
    this.modalDeleteOpen = true;
  }

  saveData() {
    const inmueble = {
      inm_id: this.formulario.get('inm_id')?.value,
      inm_codigo: this.formulario.get('inm_codigo')?.value,
      inm_cat: this.formulario.get('inm_cat')?.value,
      inm_dep: this.formulario.get('inm_dep')?.value,
      inm_serie: this.formulario.get('inm_serie')?.value,
      inm_modelo: this.formulario.get('inm_modelo')?.value,
      inm_mar: this.formulario.get('inm_mar')?.value,
      inm_loc: this.formulario.get('inm_loc')?.value,
      inm_descripcion: this.formulario.get('inm_descripcion')?.value,
      inm_encargado: this.formulario.get('inm_encargado')?.value,
      inm_anio_ingreso: this.formulario.get('inm_anio_ingreso')?.value
    };

    this.entidadInmueble.addInmobiliario(inmueble).subscribe(()=>{
      this.loadInmuebles()
      this.closeModal();
    })
  }

  updateData() {
    const inmueble = {
      inm_id: this.formulario.get('inm_id')?.value,
      inm_codigo: this.formulario.get('inm_codigo')?.value,
      inm_cat: this.formulario.get('inm_cat')?.value,
      inm_dep: this.formulario.get('inm_dep')?.value,
      inm_serie: this.formulario.get('inm_serie')?.value,
      inm_modelo: this.formulario.get('inm_modelo')?.value,
      inm_mar: this.formulario.get('inm_mar')?.value,
      inm_loc: this.formulario.get('inm_loc')?.value,
      inm_descripcion: this.formulario.get('inm_descripcion')?.value,
      inm_encargado: this.formulario.get('inm_encargado')?.value,
      inm_anio_ingreso: this.formulario.get('inm_anio_ingreso')?.value
    };

    this.entidadInmueble.updateInmobiliario(inmueble.inm_id,inmueble).subscribe(()=>{
      this.loadInmuebles()
      this.closeModal();
    })
  }

  deleteData() {
    const inm_id = this.formulario.get('inm_id')?.value
    this.entidadInmueble.deleteInmobiliario(inm_id).subscribe(()=>{
      this.loadInmuebles()
      this.closeDeleteModal();
    })
  }

  isFormValid(): boolean {
    return this.formulario.valid
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.entidadInmueble.loadInmuebleFiltro(filterValue).subscribe((data) => {
      this.data = data;
    });
  }
}

