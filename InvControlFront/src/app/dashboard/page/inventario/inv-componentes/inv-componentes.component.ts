import { Component } from '@angular/core';
import { MetaDataColumn } from '../../../share/interfaces/metacolumn.interface';
import { TipoUbicacionService } from '../../../services/tipoUbicacion/tipo-ubicacion.service';
import { SoftwareService } from '../../../services/software/software.service';

@Component({
  selector: 'app-inv-componentes',
  templateUrl: './inv-componentes.component.html',
  styleUrls: ['./inv-componentes.component.css']
})
export class InvComponentesComponent {
  modalOpen: boolean = false;
  modalDeleteOpen: boolean = false;
  showButtonCreate: boolean = false;
  showButtonEdit: boolean = false;

  titleText: string = '';
  serieText: string = '';
  codigoBienText: string = '';
  codigoUtaText: string = '';
  detCatIdText: number | null = null;
  modeloText: string = '';
  marcaText: string = '';
  caracteristicaText: string = '';
  depIdText: number | null = null;
  anioIngresoText: number | null = null;
  disponibleText: boolean = false;
  idRow: string = '';
  dataTipoUbicacion: any[] = [];

  data: any[] = [
    {
      com_id: 1,
      com_serie: "12345",
      com_codigo_bien: "CB-001",
      com_codigo_uta: "UTA-001",
      com_det_cat_id: 1,
      com_modelo: "Modelo A",
      com_marca: "Marca X",
      com_caracteristica: "Característica 1",
      com_dep_id: 101,
      com_anio_ingreso: 2021,
      com_disponible: true
    },
    {
      com_id: 2,
      com_serie: "67890",
      com_codigo_bien: "CB-002",
      com_codigo_uta: "UTA-002",
      com_det_cat_id: 2,
      com_modelo: "Modelo B",
      com_marca: "Marca Y",
      com_caracteristica: "Característica 2",
      com_dep_id: 102,
      com_anio_ingreso: 2020,
      com_disponible: false
    }
  ];

  metaDataColumns: MetaDataColumn[] = [
    { field: "com_serie", title: "SERIE" },
    { field: "com_codigo_bien", title: "CÓDIGO BIEN" },
    { field: "com_codigo_uta", title: "CÓDIGO UTA" },
    { field: "com_det_cat_id", title: "DET CAT ID" },
    { field: "com_modelo", title: "MODELO" },
    { field: "com_marca", title: "MARCA" },
    { field: "com_caracteristica", title: "CARACTERÍSTICA" },
    { field: "com_dep_id", title: "DEP ID" },
    { field: "com_anio_ingreso", title: "AÑO INGRESO" },
    { field: "com_disponible", title: "DISPONIBLE" }
  ];

  constructor() {
    this.loadTipoUbicaciones();
  }

  loadComponentes() {
    // Utilizando datos estáticos
    // Si fuera necesario, puedes añadir más lógica aquí.
  }

  loadTipoUbicaciones() {
    this.dataTipoUbicacion = [
      { sof_tip_ubi: 1, nombre: 'Laboratorio 1' },
      { sof_tip_ubi: 2, nombre: 'Laboratorio 2' }
    ];
  }

  openModal(action: string, row: any) {
    if (action == 'crear') {
      this.titleText = 'CREAR COMPONENTE';
      this.serieText = '';
      this.codigoBienText = '';
      this.codigoUtaText = '';
      this.detCatIdText = null;
      this.modeloText = '';
      this.marcaText = '';
      this.caracteristicaText = '';
      this.depIdText = null;
      this.anioIngresoText = null;
      this.disponibleText = false;
      this.showButtonCreate = true;
      this.showButtonEdit = false;
    } else {
      this.titleText = 'ACTUALIZAR COMPONENTE';
      this.serieText = row.com_serie;
      this.codigoBienText = row.com_codigo_bien;
      this.codigoUtaText = row.com_codigo_uta;
      this.detCatIdText = row.com_det_cat_id;
      this.modeloText = row.com_modelo;
      this.marcaText = row.com_marca;
      this.caracteristicaText = row.com_caracteristica;
      this.depIdText = row.com_dep_id;
      this.anioIngresoText = row.com_anio_ingreso;
      this.disponibleText = row.com_disponible;
      this.showButtonCreate = false;
      this.showButtonEdit = true;
      this.idRow = row.com_id;
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
    this.idRow = row.com_id;
    this.modalDeleteOpen = true;
  }

  saveData() {
    const componente = {
      com_id: this.data.length + 1, // Generar un nuevo ID
      com_serie: this.serieText,
      com_codigo_bien: this.codigoBienText,
      com_codigo_uta: this.codigoUtaText,
      com_det_cat_id: this.detCatIdText,
      com_modelo: this.modeloText,
      com_marca: this.marcaText,
      com_caracteristica: this.caracteristicaText,
      com_dep_id: this.depIdText,
      com_anio_ingreso: this.anioIngresoText,
      com_disponible: this.disponibleText
    };
    this.data.push(componente);
    this.closeModal();
  }

  updateData() {
    const index = this.data.findIndex(componente => componente.com_id === this.idRow);
    if (index !== -1) {
      this.data[index] = {
        com_id: this.idRow,
        com_serie: this.serieText,
        com_codigo_bien: this.codigoBienText,
        com_codigo_uta: this.codigoUtaText,
        com_det_cat_id: this.detCatIdText,
        com_modelo: this.modeloText,
        com_marca: this.marcaText,
        com_caracteristica: this.caracteristicaText,
        com_dep_id: this.depIdText,
        com_anio_ingreso: this.anioIngresoText,
        com_disponible: this.disponibleText
      };
      this.closeModal();
    }
  }

  deleteData() {
    this.data = this.data.filter(componente => componente.com_id !== this.idRow);
    this.closeDeleteModal();
  }

  isFormValid(): boolean {
    return this.serieText.trim() !== '' &&
      this.codigoBienText.trim() !== '' &&
      this.codigoUtaText.trim() !== '' &&
      this.detCatIdText !== null &&
      this.modeloText.trim() !== '' &&
      this.marcaText.trim() !== '' &&
      this.caracteristicaText.trim() !== '' &&
      this.depIdText !== null &&
      this.anioIngresoText !== null;
  }
}

