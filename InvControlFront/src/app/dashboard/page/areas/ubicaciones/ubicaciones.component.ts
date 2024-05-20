import { Component } from '@angular/core';
import { MetaDataColumn } from '../../../share/interfaces/metacolumn.interface';

@Component({
  selector: 'app-ubicaciones',
  templateUrl: './ubicaciones.component.html',
  styleUrls: ['./ubicaciones.component.css']
})
export class UbicacionesComponent {
  modalOpen: boolean = false;
  modalDeleteOpen: boolean = false;

  locationText: string = '';
  buildingOption: string = '';
  typeOption: string = '';

  data:any[] = []
  dataFaculty:any[] = []
  showButtonCreate: boolean = false;
  showButtonEdit: boolean = false;
  idRow:string = '';
  titleText:string = '';

  metaDataColumns:MetaDataColumn[] = [
    {field:"ubi_nombre", title:"NOMBRE"},
    {field:"blo_nombre", title:"BLOQUE"},
    {field:"tip_ubi_nombre", title:"TIPO DE UBICACION"}
  ]

  constructor(){

  }



  openModal(action:string,row: any) {
    if (action == 'crear'){
      this.titleText = 'CREAR UBICACION'
      this.locationText = ''
      this.showButtonCreate = true
      this.showButtonEdit = false
    }else{
      this.titleText = 'ACTUALIZAR UBICACION'
      this.showButtonCreate = false
      this.showButtonEdit = true
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
    this.idRow = row.blo_id
    this.modalDeleteOpen = true;
  }
  saveData() {
    this.closeModal();
  }
  updateData() {
    this.closeModal();
  }

  deleteData(){

    this.closeDeleteModal();
  }

  isFormValid(): boolean {
    return this.locationText.trim() !== '' && !!this.typeOption && !!this.buildingOption;
  }
}
