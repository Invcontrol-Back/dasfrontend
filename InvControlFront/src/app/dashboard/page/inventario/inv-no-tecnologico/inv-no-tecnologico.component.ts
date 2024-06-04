import { Component } from '@angular/core';
import { MetaDataColumn } from '../../../share/interfaces/metacolumn.interface';
import { TipoUbicacionService } from '../../../services/tipoUbicacion/tipo-ubicacion.service';
import { SoftwareService } from '../../../services/software/software.service';
import { Software } from 'src/app/dashboard/share/models/software.model';
import { InmobiliarioService } from 'src/app/dashboard/services/inmobiliario/inmobiliario.service';
import { DependenciaService } from 'src/app/dashboard/services/dependencia/dependencia.service';
import { UsuarioService } from 'src/app/dashboard/services/usuario/usuario.service';
import { CategoriaService } from 'src/app/dashboard/services/categoria/categoria.service';

@Component({
  selector: 'app-inv-no-tecnologico',
  templateUrl: './inv-no-tecnologico.component.html',
  styleUrls: ['./inv-no-tecnologico.component.css']
})
export class InvNoTecnologicoComponent {
  modalOpen: boolean = false;
  modalDeleteOpen: boolean = false;
  showButtonCreate: boolean = false;
  showButtonEdit: boolean = false;

  titleText: string = '';
  codigoText: string = '';
  serieText: string = '';
  modeloText: string = '';
  marcaText: string = '';
  categoriaText: string = '';
  anioIngresoText: number = new Date().getFullYear();
  encargadoIdText: string = '';
  dependenciaText: string = '';
  idRow: string = '';

  dataUsuarios: any[] = [];
  dataDependencia:any[] = []
  dataCategoria:any[] = []
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
    { field: "inm_anio_ingreso", title: "AÑO DE INGRESO" },
  ];

  constructor(private entidadInmueble:InmobiliarioService,private entidadDependencia:DependenciaService,
    private entidadUsuario:UsuarioService,private entidadCategoria:CategoriaService
  ) {
    this.loadInmuebles();
    this.loadUsuarios();
    this.loadDependencia();
    this.loadCategorias()
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

  openModal(action: string, row: any) {
    if (action === 'crear') {
      this.titleText = 'CREAR INMUEBLE';
      this.codigoText = '';
      this.serieText = '';
      this.modeloText = '';
      this.marcaText = '';
      this.categoriaText = '';
      this.anioIngresoText = new Date().getFullYear();
      this.encargadoIdText = this.dataUsuarios[0]?.id || null;
      this.dependenciaText = '';
      this.showButtonCreate = true;
      this.showButtonEdit = false;
      this.disableInput = false
    } else {
      this.titleText = 'ACTUALIZAR INMUEBLE';
      this.codigoText = row.inm_codigo;
      this.serieText = row.inm_serie;
      this.modeloText = row.inm_modelo;
      this.marcaText = row.inm_marca;
      this.categoriaText = row.inm_cat;
      this.anioIngresoText = row.inm_anio_ingreso;
      this.encargadoIdText = row.inm_encargado;
      this.dependenciaText = row.inm_dep;
      this.showButtonCreate = false;
      this.showButtonEdit = true;
      this.idRow = row.inm_id;
      this.disableInput = true

    }
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  closeDeleteModal() {
    this.modalDeleteOpen = false;
  }

  openDeleteModal(row: any) {
    this.idRow = row.inm_id;
    this.modalDeleteOpen = true;
  }

  saveData() {
    const inmueble = {
      inm_codigo: this.codigoText,
      inm_serie: this.serieText,
      inm_modelo: this.modeloText,
      inm_marca: this.marcaText,
      inm_anio_ingreso: this.anioIngresoText,
      inm_encargado: this.encargadoIdText,
      inm_dep: this.dependenciaText,
      inm_cat:this.categoriaText
    };
    
    this.entidadInmueble.addInmobiliario(inmueble).subscribe(()=>{
      this.loadInmuebles()
      this.closeModal();
    })
  }

  updateData() {
    const inmueble = {
      inm_codigo: this.codigoText,
      inm_serie: this.serieText,
      inm_modelo: this.modeloText,
      inm_marca: this.marcaText,
      inm_anio_ingreso: this.anioIngresoText,
      inm_encargado: this.encargadoIdText,
      inm_dep: this.dependenciaText,
      inm_cat: this.categoriaText
    };
    
    this.entidadInmueble.updateInmobiliario(this.idRow,inmueble).subscribe(()=>{
      this.loadInmuebles()
      this.closeModal();
    })
  }

  deleteData() {
    this.entidadInmueble.deleteInmobiliario(this.idRow).subscribe(()=>{
      this.loadInmuebles()
      this.closeDeleteModal();
    })
  }

  isFormValid(): boolean {
    return this.codigoText !== '' &&
      this.serieText !== '' &&
      this.modeloText !== '' &&
      this.marcaText !== '' &&
      this.categoriaText !== '' &&
      !!this.anioIngresoText &&
      this.encargadoIdText !== '' &&
      this.dependenciaText !== '';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.entidadInmueble.loadInmuebleFiltro(filterValue).subscribe((data) => {
      this.data = data;
    });
  }
}

