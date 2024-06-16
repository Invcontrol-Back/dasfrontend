import { Component } from '@angular/core';
import { MetaDataColumn } from '../../../share/interfaces/metacolumn.interface';
import { BloqueService } from 'src/app/dashboard/services/bloque/bloque.service';
import { TipoUbicacionService } from 'src/app/dashboard/services/tipoUbicacion/tipo-ubicacion.service';
import { UbicacionService } from 'src/app/dashboard/services/ubicacion/ubicacion.service';

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
  dataBuilding:any[] = []
  dataTypeLocation:any[] = []
  dataFiltroBloques:any []= []
  dataFiltroTipoUbi:any [] =[]

  filtroBloque = ''
  filtroTipoUbi = ''
  
  showButtonCreate: boolean = false;
  showButtonEdit: boolean = false;
  idRow:string = '';
  titleText:string = '';

  metaDataColumns:MetaDataColumn[] = [
    {field:"ubi_nombre", title:"NOMBRE"},
    {field:"blo_nombre", title:"BLOQUE"},
    {field:"tip_ubi_nombre", title:"TIPO DE UBICACION"}
  ]

  constructor(private buildingEntity:BloqueService,
    private typeLocationEntity:TipoUbicacionService,
    private locationEntity:UbicacionService,
    )
    {
    this.loadBuildings();
    this.loadTypeLocations();
    this.loadLocations();
    this.loadTypeLocation();
  }

  loadBuildings(){
    this.buildingEntity.loadBuildings().subscribe(data => {
      this.dataBuilding = data
      this.dataFiltroBloques = data
    },error => {
      console.log(error)
    })
  }

  loadTypeLocations(){
    this.typeLocationEntity.loadTipoUbicaciones().subscribe(data => {
      this.dataTypeLocation = data
    },error => {
      console.log(error)
    })
  }

  loadTypeLocation(){
    this.typeLocationEntity.loadBuildings().subscribe(data => {
      this.dataFiltroTipoUbi = data
    },error => {
      console.log(error)
    })
  }

  loadLocations(){
    this.locationEntity.loadLocations().subscribe(data => {
      this.data = data
    },error => {
      console.log(error)
    })
  }

  openModal(action:string,row: any) {
    if (action == 'crear'){
      this.titleText = 'CREAR UBICACION'
      this.locationText = ''
      this.buildingOption = this.dataBuilding[0].blo_id
      this.typeOption = this.dataTypeLocation[0].tip_ubi_id
      this.showButtonCreate = true
      this.showButtonEdit = false
    }else{
      this.titleText = 'ACTUALIZAR UBICACION'
      this.locationText = row.ubi_nombre
      this.buildingOption = row.ubi_blo
      this.typeOption = row.ubi_tip_ubi
      this.idRow = row.ubi_id
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
    this.idRow = row.ubi_id
    this.modalDeleteOpen = true;
  }
  saveData() {
    const location = {ubi_nombre:this.locationText,ubi_blo:Number(this.buildingOption), ubi_tip_ubi:Number(this.typeOption)}
    this.locationEntity.addLocation(location).subscribe(() => {
      this.loadLocations();
    })
    this.closeModal();
  }
  updateData() {
    const location = {ubi_nombre:this.locationText,ubi_blo:Number(this.buildingOption), ubi_tip_ubi:Number(this.typeOption)}
    this.locationEntity.updateLocation(this.idRow,location).subscribe(() => {
      this.loadLocations();
    })
    this.closeModal();
  }

  deleteData(){
    this.locationEntity.deleteLocation(this.idRow).subscribe(() => {
      this.loadLocations();
    })
    this.closeDeleteModal();
  }

  isFormValid(): boolean {
    return this.locationText.trim() !== '' && !!this.typeOption && !!this.buildingOption;
  }

  onFiltroBloqueChange() {
    if (this.filtroBloque == 'TODOS'){
      this.loadLocations()
    }else{
      this.loadFiltroBloques()
    }
  }

  onFiltroTipUbiChange() {
    console.log('Filtro Tipo Ubi Changed:', this.filtroTipoUbi);
    if (this.filtroTipoUbi == 'TODOS') {
      this.loadLocations();
    } else {
      this.loadFiltroTipoUbi();
    }
  }


  loadFiltroBloques(){
    console.log('xxxxxxxxx:', this.filtroBloque);
    console.log('Filtro Tipo Ubi Changed:', this.filtroBloque);
      this.locationEntity.loadFilterLocationBuildings(this.filtroBloque).subscribe(data=>{
      console.log('Filtered Data:', data);
      this.data = data
    })  
  }

  loadFiltroTipoUbi() {
    console.log('Loading Filtered Locations for Tipo Ubi:', this.filtroTipoUbi);
     this.locationEntity.loadFilterTypesBuildings(this.filtroTipoUbi).subscribe(data => {
      console.log('Filtered Data:', data);
      this.data = data;
    }, error => {
      console.log('Error loading filtered locations:', error);
    });  
  }





}
