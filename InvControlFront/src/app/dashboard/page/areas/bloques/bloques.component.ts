import { Component } from '@angular/core';
import { MetaDataColumn } from '../../../share/interfaces/metacolumn.interface';
import { BloqueService } from '../../../services/bloque/bloque.service';
import { FacultadService } from '../../../services/facultad/facultad.service';

@Component({
  selector: 'app-bloques',
  templateUrl: './bloques.component.html',
  styleUrls: ['./bloques.component.css']
})
export class BloquesComponent {
  modalOpen: boolean = false;
  modalDeleteOpen: boolean = false;
  buildingText: string = '';
  selectedOption: string = '';
  data:any[] = []
  dataFaculty:any[] = []
  showButtonCreate: boolean = false;
  showButtonEdit: boolean = false;
  idRow:string = '';
  titleText:string = '';

  metaDataColumns:MetaDataColumn[] = [
    {field:"blo_nombre", title:"NOMBRE"},
    {field:"fac_nombre", title:"FACULTAD"}
  ]

  constructor(private buildingEntity:BloqueService,private facultyEntity:FacultadService){
    this.loadBuildings()
    this.loadFacultys()
  }

  loadBuildings(){
    this.buildingEntity.loadBuildings().subscribe(data => {
      this.data = data
    },error => {
      console.log(error)
    })
  }

  loadFacultys(){
    this.facultyEntity.loadFacultys().subscribe(data => {
      this.dataFaculty = data
      this.selectedOption = this.dataFaculty[0].fac_id;
    },error => {
      console.log(error)
    })
  }

  openModal(action:string,row: any) {
    if (action == 'crear'){
      this.titleText = 'CREAR BLOQUE'
      this.buildingText = ''
      this.selectedOption = this.dataFaculty[0].fac_id;
      this.showButtonCreate = true
      this.showButtonEdit = false
    }else{
      this.titleText = 'ACTUALIZAR BLOQUE'
      this.buildingText = row.blo_nombre
      this.selectedOption = row.blo_fac
      this.showButtonCreate = false
      this.showButtonEdit = true
      this.idRow = row.blo_id
    }
    this.modalOpen = true;
  }

  closeModal() {
    this.buildingText = ''
    this.selectedOption = this.dataFaculty[0].fac_id;
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
    const building = {blo_nombre:this.buildingText,blo_fac:Number(this.selectedOption)}
    this.buildingEntity.addBuilding(building).subscribe(() => {
      this.loadBuildings()
    })
    this.closeModal();
  }
  updateData() {
    const building = {blo_nombre:this.buildingText,blo_fac:Number(this.selectedOption)}
    this.buildingEntity.updateBuilding(this.idRow,building).subscribe(() => {
      this.loadBuildings()
    })
    this.closeModal();
  }

  deleteData(){
    this.buildingEntity.deleteBuilding(this.idRow).subscribe(() => {
      this.loadBuildings()
    })
    this.closeDeleteModal();
  }

  isFormValid(): boolean {
    return this.buildingText.trim() !== '' && !!this.selectedOption;
  }
}
