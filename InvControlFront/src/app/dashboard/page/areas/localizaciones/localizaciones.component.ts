import { Component } from '@angular/core';
import { LocalizacionService } from 'src/app/dashboard/services/localizacion/localizacion.service';
import { UbicacionService } from 'src/app/dashboard/services/ubicacion/ubicacion.service';
import { MetaDataColumn } from 'src/app/dashboard/share/interfaces/metacolumn.interface';
import { TecnologicoService } from 'src/app/dashboard/services/tecnologico/tecnologico.service';

@Component({
  selector: 'app-localizaciones',
  templateUrl: './localizaciones.component.html',
  styleUrls: ['./localizaciones.component.css']
})
export class LocalizacionesComponent {

  modalOpen: boolean = false;
  modalDeleteOpen: boolean = false;
  modalChangeOpen: boolean = false;
  modalConfirmOpen: boolean = false;

  showButtonCreate: boolean = false;
  showButtonEdit: boolean = false;

  nombreText: string = '';
  ubicacionSeleccion: string = '';
  idRow:string = '';
  bienTecnologico:any
  titleText:string = '';
  filtroUbicacion:string = '';

  data:any[] = []
  datosUbicaciones:any[] = []
  datosTecnologico:any[] = []

  metaDataColumns:MetaDataColumn[] = [
    {field:"loc_nombre", title:"ETIQUETA"},
    {field:"ubi_nombre", title:"UBICACION"},
    {field:"blo_nombre", title:"BLOQUE"},
    {field:"tec_codigo", title:"BIEN ASOCIADO"},
  ]

  metaDataColumnsModal:MetaDataColumn[] = [
    {field:"tec_codigo", title:"CODIGO"},
    {field:"cat_nombre", title:"CATEGORIA"},
  ]

  constructor(private entidadLocalizacion:LocalizacionService,private entidadUbicacion:UbicacionService,private entidadTecnologico:TecnologicoService,){
    this.loadLocalizaciones();
    this.loadUbicaciones();
    this.loadTecnologias();
  }

  loadTecnologias(){
    this.entidadTecnologico.getTecnologias().subscribe(data => {
      this.datosTecnologico = data
      console.log(data)
    },error => {
      console.log(error)
    })
  }

  loadLocalizaciones(){
    this.entidadLocalizacion.loadLocalizaciones().subscribe(data => {
      this.data = data
    },error => {
      console.log(error)
    })
  }

  loadUbicaciones(){
    this.entidadUbicacion.loadLocations().subscribe(data => {
      this.datosUbicaciones = data
    },error => {
      console.log(error)
    })
  }

  openModal(action:string,row: any) {
    if (action == 'crear'){
      this.titleText = 'CREAR ETIQUETA'
      this.nombreText = ''
      this.ubicacionSeleccion = this.datosUbicaciones[0].ubi_id;
      this.showButtonCreate = true
      this.showButtonEdit = false
    }else{
      this.titleText = 'ACTUALIZAR ETIQUETA'
      this.nombreText = row.loc_nombre
      this.ubicacionSeleccion = row.loc_ubi
      this.showButtonCreate = false
      this.showButtonEdit = true
      this.idRow = row.loc_id
    }
    this.modalOpen = true;
  }

  closeModal() {
    this.nombreText = ''
    this.ubicacionSeleccion = this.datosUbicaciones[0].ubi_id;
    this.modalOpen = false;
  }
  closeDeleteModal(){
    this.modalDeleteOpen = false;
  }
  openDeleteModal(row:any){
    this.idRow = row.loc_id
    this.modalDeleteOpen = true;
  }

  openChangeModal(row:any){
    this.idRow = row.loc_id
    this.modalChangeOpen = true;
  }
  closeChangeModal(){
    this.modalChangeOpen = false;
  }

  openConfirmModal(row:any){
    this.bienTecnologico = row
    this.modalChangeOpen = false;
    this.modalConfirmOpen = true;
  }
  closeConfirmModal(){
    this.modalChangeOpen =true;
    this.modalConfirmOpen = false;
  }
  changeLabel(){
    this.bienTecnologico.tec_loc = this.idRow
    console.log(this.bienTecnologico)
    this.entidadTecnologico.updateTecnologia(this.bienTecnologico.tec_id,this.bienTecnologico).subscribe(data => {
      this.modalChangeOpen = false;
      this.modalConfirmOpen = false;
      this.loadLocalizaciones();
    },error => {
      console.log(error)
    })
  }

  saveData() {
    const etiqueta = {loc_nombre:this.nombreText,loc_ubi:Number(this.ubicacionSeleccion)}
    this.entidadLocalizacion.addLocalizacion(etiqueta).subscribe(() => {
      this.loadLocalizaciones()
    })
    this.closeModal();
  }
  updateData() {
    const etiqueta = {loc_nombre:this.nombreText,loc_ubi:Number(this.ubicacionSeleccion)}
    this.entidadLocalizacion.updateLocalizacion(this.idRow,etiqueta).subscribe(()=>{
      this.loadLocalizaciones()
    })
    this.closeModal();
  }

  deleteData(){
    this.entidadLocalizacion.deleteLocalizacion(this.idRow).subscribe(()=>{
      this.loadLocalizaciones()
    })
    this.closeDeleteModal()
  }

  isFormValid(): boolean {
    return this.nombreText.trim() !== '' && !!this.ubicacionSeleccion;
  }

  onFiltroUbicacionChange(){
    if (this.filtroUbicacion == 'TODOS'){
      this.loadLocalizaciones()
    }else{
      this.loadLocalizacionesUbicacion()
    }
  }

  loadLocalizacionesUbicacion(){
    this.entidadLocalizacion.loadFilterLocalizacionesLaboratorio(this.filtroUbicacion).subscribe(data=>{
      this.data = data
    })
  }
}
