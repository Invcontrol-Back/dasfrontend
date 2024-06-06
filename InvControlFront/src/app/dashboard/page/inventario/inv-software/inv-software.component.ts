import { Component } from '@angular/core';
import { MetaDataColumn } from '../../../share/interfaces/metacolumn.interface';
import { TipoUbicacionService } from '../../../services/tipoUbicacion/tipo-ubicacion.service';
import { SoftwareService } from '../../../services/software/software.service';
import { Software } from 'src/app/dashboard/share/models/software.model';

@Component({
  selector: 'app-inv-software',
  templateUrl: './inv-software.component.html',
  styleUrls: ['./inv-software.component.css']
})
export class InvSoftwareComponent {
  modalOpen: boolean = false;
  modalDeleteOpen: boolean = false;
  showButtonCreate: boolean = false;
  showButtonEdit: boolean = false;
  
  titleText:string = '';
  softwareText: string = '';
  versionText: string = '';
  tipoText: string = '';
  duracionText: string = '';
  descripcionText: string = '';
  laboratorioSeleccionado: string = '';
  idRow:string = '';
  dataTipoUbicacion:any[] = []
  tipos: string[] = ['LIBRE', 'LICENCIA'];

  data:any[] = []
  metaDataColumns:MetaDataColumn[] = [
    {field:"sof_nombre", title:"NOMBRE"},
    {field:"sof_version", title:"VERSIÓN"},
    {field:"sof_tipo", title:"TIPO"},
    {field:"sof_duracion", title:"DURACIÓN"},
    {field:"sof_descripcion", title:"DESCRIPCION"},
    {field:"tip_ubi_nombre", title:"LABORATORIO"}
  ]

  constructor(private entidadTipoUbicacion:TipoUbicacionService,private entidadSoftware:SoftwareService){
    this.loadSoftwares();
    this.loadTipoUbicaciones();
  }

  loadSoftwares(){
    this.entidadSoftware.loadSoftwares().subscribe(data => {
      this.data = data
    },error => {
      console.log(error)
    })
  }

  loadTipoUbicaciones(){
    this.entidadTipoUbicacion.loadTipoUbicaciones().subscribe(data => {
      this.dataTipoUbicacion = data
    },error => {
      console.log(error)
    })
  }

  openModal(action:string,row: any) {
    if (action == 'crear'){
      this.titleText = 'CREAR SOFTWARE'
      this.softwareText = ''
      this.versionText = ''
      this.tipoText = ''
      this.duracionText = ''
      this.descripcionText = ''
      this.laboratorioSeleccionado = this.dataTipoUbicacion[0].sof_tip_ubi;
      this.showButtonCreate = true
      this.showButtonEdit = false
    }else{
      this.titleText = 'ACTUALIZAR SOFTWARE'
      this.softwareText = row.sof_nombre
      this.versionText = row.sof_version
      this.tipoText = row.sof_tipo
      this.duracionText = row.sof_duracion
      this.descripcionText = row.sof_descripcion
      this.laboratorioSeleccionado= row.sof_tip_ubi
      this.showButtonCreate = false
      this.showButtonEdit = true
      this.idRow = row.sof_id
    }
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  closeDeleteModal(){
    this.modalDeleteOpen = false;
  }
  openDeleteModal(row:any){
    this.idRow = row.sof_id
    this.modalDeleteOpen = true;
  }

  saveData() {
    const software = {sof_nombre:this.softwareText,sof_version:this.versionText,sof_tipo:this.tipoText,sof_duracion:this.duracionText,sof_descripcion:this.descripcionText,sof_tip_ubi:Number(this.laboratorioSeleccionado)}
    this.entidadSoftware.addSoftware(software).subscribe(() => {
      this.loadSoftwares()
    })
    this.closeModal();
  }
  updateData() {
    const software = {sof_nombre:this.softwareText,sof_version:this.versionText,sof_tipo:this.tipoText,sof_duracion:this.duracionText,sof_descripcion:this.descripcionText,sof_tip_ubi:Number(this.laboratorioSeleccionado)}
    this.entidadSoftware.updateSoftware(this.idRow,software).subscribe(() => {
      this.loadSoftwares()
    })
    this.closeModal();
  }

  deleteData(){
    this.entidadSoftware.deleteSoftware(this.idRow).subscribe(() => {
      this.loadSoftwares()
    })
    this.closeDeleteModal();
  }

  isFormValid(): boolean {
    return this.softwareText.trim() !== '' && this.versionText.trim() !== '' && this.tipoText.trim() !== '' &&this.duracionText.trim() !== ''&&this.descripcionText.trim() !== ''&& !!this.laboratorioSeleccionado;
  }
}
