import { Component } from '@angular/core';
import { MetaDataColumn } from '../../../share/interfaces/metacolumn.interface';
import { TipoUbicacionService } from '../../../services/tipoUbicacion/tipo-ubicacion.service';
import { SoftwareService } from '../../../services/software/software.service';
import { Software } from 'src/app/dashboard/share/models/software.model';

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
  disponibleText: boolean = false;
  encargadoIdText: number | null = null;
  depIdText: number | null = null;
  idRow: string = '';
  dataTipoUbicacion: any[] = [];

  data: any[] = [];
  metaDataColumns: MetaDataColumn[] = [
    { field: "inm_codigo", title: "CÓDIGO" },
    { field: "inm_serie", title: "SERIE" },
    { field: "inm_modelo", title: "MODELO" },
    { field: "inm_marca", title: "MARCA" },
    { field: "inm_categoria", title: "CATEGORÍA" },
    { field: "inm_anio_ingreso", title: "AÑO DE INGRESO" },
    { field: "inm_disponible", title: "DISPONIBLE" }
  ];

  constructor() {
    this.loadInmuebles();
    this.loadTipoUbicaciones();
  }

  loadInmuebles() {
    this.data = [
      {
        inm_id: 1,
        inm_codigo: 'INM001',
        inm_serie: 'S12345',
        inm_modelo: 'Modelo A',
        inm_marca: 'Marca X',
        inm_categoria: 'Categoría 1',
        inm_anio_ingreso: 2020,
        inm_disponible: true,
        inm_encargado_id: 101,
        inm_dep_id: 10
      },
      {
        inm_id: 2,
        inm_codigo: 'INM002',
        inm_serie: 'S67890',
        inm_modelo: 'Modelo B',
        inm_marca: 'Marca Y',
        inm_categoria: 'Categoría 2',
        inm_anio_ingreso: 2021,
        inm_disponible: false,
        inm_encargado_id: 102,
        inm_dep_id: 20
      }
    ];
  }

  loadTipoUbicaciones() {
    this.dataTipoUbicacion = [
      { id: 101, nombre: 'Encargado 1' },
      { id: 102, nombre: 'Encargado 2' }
    ];
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
      this.disponibleText = false;
      this.encargadoIdText = this.dataTipoUbicacion[0]?.id || null;
      this.depIdText = null;
      this.showButtonCreate = true;
      this.showButtonEdit = false;
    } else {
      this.titleText = 'ACTUALIZAR INMUEBLE';
      this.codigoText = row.inm_codigo;
      this.serieText = row.inm_serie;
      this.modeloText = row.inm_modelo;
      this.marcaText = row.inm_marca;
      this.categoriaText = row.inm_categoria;
      this.anioIngresoText = row.inm_anio_ingreso;
      this.disponibleText = row.inm_disponible;
      this.encargadoIdText = row.inm_encargado_id;
      this.depIdText = row.inm_dep_id;
      this.showButtonCreate = false;
      this.showButtonEdit = true;
      this.idRow = row.inm_id;
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
      inm_categoria: this.categoriaText,
      inm_anio_ingreso: this.anioIngresoText,
      inm_disponible: this.disponibleText,
      inm_encargado_id: this.encargadoIdText,
      inm_dep_id: this.depIdText
    };
    this.data.push({ ...inmueble, inm_id: this.data.length + 1 });
    this.closeModal();
  }

  updateData() {
    const inmueble = {
      inm_codigo: this.codigoText,
      inm_serie: this.serieText,
      inm_modelo: this.modeloText,
      inm_marca: this.marcaText,
      inm_categoria: this.categoriaText,
      inm_anio_ingreso: this.anioIngresoText,
      inm_disponible: this.disponibleText,
      inm_encargado_id: this.encargadoIdText,
      inm_dep_id: this.depIdText
    };
    const index = this.data.findIndex(item => item.inm_id === this.idRow);
    if (index !== -1) {
      this.data[index] = { ...inmueble, inm_id: this.idRow };
    }
    this.closeModal();
  }

  deleteData() {
    this.data = this.data.filter(item => item.inm_id !== this.idRow);
    this.closeDeleteModal();
  }

  isFormValid(): boolean {
    return this.codigoText.trim() !== '' &&
      this.serieText.trim() !== '' &&
      this.modeloText.trim() !== '' &&
      this.marcaText.trim() !== '' &&
      this.categoriaText.trim() !== '' &&
      !!this.anioIngresoText &&
      this.encargadoIdText !== null &&
      this.depIdText !== null;
  }
}

