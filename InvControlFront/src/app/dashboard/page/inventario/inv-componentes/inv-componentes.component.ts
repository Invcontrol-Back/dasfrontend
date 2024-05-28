import { Component } from '@angular/core';
import { MetaDataColumn } from '../../../share/interfaces/metacolumn.interface';
import { TipoUbicacionService } from '../../../services/tipoUbicacion/tipo-ubicacion.service';
import { SoftwareService } from '../../../services/software/software.service';
import { ComponenteService } from 'src/app/dashboard/services/componente/componente.service';
import { UbicacionService } from 'src/app/dashboard/services/ubicacion/ubicacion.service';
import { SubcategoriaService } from 'src/app/dashboard/services/subcategoria/subcategoria.service';
import { DependenciaService } from 'src/app/dashboard/services/dependencia/dependencia.service';

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
  subcategoriaSeleccionada: string = '';
  modeloText: string = '';
  marcaText: string = '';
  caracteristicaText: string = '';
  dependenciaSeleccionada: string = '';
  anioIngresoText: string = '';
  idRow: string = '';
  isDisabled: boolean = true;
  BienVacio : boolean = true;
  UTAVacio: boolean = true;
  dataDependencia:any [] = []
  dataSubcategoria: any[] = [];

  data: any[] = [
  ];

  metaDataColumns: MetaDataColumn[] = [
    { field: "com_serie", title: "SERIE" },
    { field: "com_codigo_bien", title: "CÓDIGO BIEN" },
    { field: "com_codigo_uta", title: "CÓDIGO UTA" },
    { field: "det_cat_nombre", title: "SUBCATEGORIA" },
    { field: "com_modelo", title: "MODELO" },
    { field: "com_marca", title: "MARCA" },
    { field: "com_caracteristica", title: "CARACTERÍSTICA" },
    { field: "dep_nombre", title: "DEPENDENCIA" },
    { field: "com_anio_ingreso", title: "AÑO INGRESO" },
  ];

  constructor(private entidadComponente:ComponenteService,private entidadSubCategoria:SubcategoriaService,private entidadDependencia:DependenciaService,
    private entidadCOmponente:ComponenteService
  ) {
    this.loadComponentes()
    this.loadSubcategorias()
    this.loadDependencias()
  }

  loadComponentes() {
    this.entidadComponente.loadComponentes().subscribe(data => {
      this.data = data
    },error => {
      console.log(error)
    })
  }

  loadSubcategorias(){
    this.entidadSubCategoria.loadSubCategorias().subscribe(data => {
      this.dataSubcategoria = data
    },error => {
      console.log(error)
    })
  }

  loadDependencias(){
    this.entidadDependencia.loadDependencias().subscribe(data =>{
      this.dataDependencia = data
    },error =>{
      console.log(error)
    })
  }


  openModal(action: string, row: any) {
    if (action == 'crear') {
      this.titleText = 'CREAR COMPONENTE';
      this.isDisabled = false
      this.serieText = '';
      this.codigoBienText = '';
      this.codigoUtaText = '';
      this.subcategoriaSeleccionada = this.dataSubcategoria[0].det_cat_id;
      this.modeloText = '';
      this.marcaText = '';
      this.caracteristicaText = '';
      this.dependenciaSeleccionada = this.dataDependencia[0].dep_id;
      this.anioIngresoText = '';
      this.showButtonCreate = true;
      this.showButtonEdit = false;
    } else {
      this.titleText = 'ACTUALIZAR COMPONENTE';
      this.isDisabled = true
      this.serieText = row.com_serie;
      this.codigoBienText = row.com_codigo_bien;
      this.codigoUtaText = row.com_codigo_uta;
      this.subcategoriaSeleccionada = row.com_det_cat;
      this.modeloText = row.com_modelo;
      this.marcaText = row.com_marca;
      this.caracteristicaText = row.com_caracteristica;
      this.dependenciaSeleccionada = row.com_dep;
      this.anioIngresoText = row.com_anio_ingreso;
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

  onModelChangeBien(value: string): void {
    if (value != ""){
      this.UTAVacio = false
    }else{
      this.UTAVacio = true
    }
  }
  onModelChangeUTA(value: string): void {
    if (value != ""){
      this.BienVacio = false
    }else{
      this.BienVacio = true
    }
  }

  saveData() {
    const componente = {
      com_id: this.data.length + 1,
      com_serie: this.serieText,
      com_codigo_bien: this.codigoBienText,
      com_codigo_uta: this.codigoUtaText,
      com_det_cat:  Number(this.subcategoriaSeleccionada),
      com_modelo: this.modeloText,
      com_marca: this.marcaText,
      com_caracteristica: this.caracteristicaText,
      com_dep: Number(this.dependenciaSeleccionada),
      com_anio_ingreso: this.anioIngresoText,
    };
    this.entidadCOmponente.addComponente(componente).subscribe(() => {
      this.loadComponentes()
      this.closeModal();
    })
  }

  updateData() {
      const componente = {
        com_id: this.idRow,
        com_serie: this.serieText,
        com_codigo_bien: this.codigoBienText,
        com_codigo_uta: this.codigoUtaText,
        com_det_cat: Number(this.subcategoriaSeleccionada),
        com_modelo: this.modeloText,
        com_marca: this.marcaText,
        com_caracteristica: this.caracteristicaText,
        com_dep: Number(this.dependenciaSeleccionada),
        com_anio_ingreso: this.anioIngresoText,
      };
      this.entidadCOmponente.updateComponentes(this.idRow,componente).subscribe(() => {
        this.loadComponentes()
        this.closeModal();
      })
  }

  deleteData() {
    this.entidadCOmponente.deleteComponentes(this.idRow).subscribe(() => {
      this.loadComponentes()
      this.closeDeleteModal();
    })
  }

  isFormValid(): boolean {
    return this.serieText.trim() !== '' &&
      this.subcategoriaSeleccionada !== '' &&
      this.modeloText.trim() !== '' &&
      this.marcaText.trim() !== '' &&
      this.caracteristicaText.trim() !== '' &&
      this.dependenciaSeleccionada !== null &&
      this.anioIngresoText !== null;
  }
}

