import { Component } from '@angular/core';
import { MetaDataColumn } from 'src/app/dashboard/share/interfaces/metacolumn.interface';
import { ModalComponenteComponent } from '../modal-componente/modal-componente.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GeneralService } from 'src/app/dashboard/services/general/general.service';
import { ComponenteService } from 'src/app/dashboard/services/componente/componente.service';
import { DetalleTecnologicoService } from 'src/app/dashboard/services/detalleTecnologico/detalle-tecnologico.service';
import { ModalRepotenciaComponent } from '../modal-repotencia/modal-repotencia.component';


@Component({
  selector: 'app-modal-table-componente',
  templateUrl: './modal-table-componente.component.html',
  styleUrls: ['./modal-table-componente.component.css']
})
export class ModalTableComponenteComponent {
  com_id: string =''
  com_serie:string = ''
  com_codigo_bien:string = ''
  com_codigo_uta: string =''
  com_det_cat_id:string = ''
  com_modelo:string = ''
  com_marca: string =''
  com_caracteristica:string = ''
  com_dep_id: string =''
  com_anio_ingreso: string =''
  com_eliminado: string =''
  idRow: string =''
  selectedItem: any = '';
  individuoComponente:any
  componentes:any [] = []
  modalAumentarOpen:boolean = false
  detalleRepotencia = ''

  row:any
  id_tec :any

  data: any[] =[
  
  ]

  metaDataColumns : MetaDataColumn[]=[
    {field:"comn_codigo_bien", title:"CODIGO BIEN"},
    {field:"comn_codigo_uta", title:"CODIGO UTA"},
    {field:"comn_marca", title:"MARCA"},
    {field:"comn_serie", title:"SERIE"},
    {field:"comn_modelo", title:"MODELO"},
    {field:"comn_subcategoria", title:"SUBCATEGORIA"},
    {field:"comn_caracteristica", title:"CARACTERISTICA"},
    {field:"comn_dependencia", title:"DEPENDENCIA"},
    {field:"comn_anio_ingreso", title:"AÑO DE INGRESO"},
    {field:"comn_estado", title:"ESTADO"},
    {field:"det_tec_estado_repotencia", title:"ESTADO REPOTENCIA"},
    {field:"det_tec_descripcion_repotencia", title:"DESCRIPCION REPOTENCIA"},
  ];
  

  constructor(private dialog:MatDialog ,private entidadGeneral:GeneralService,private entidadComponente:ComponenteService,
    private entidadDetalleTecnologico:DetalleTecnologicoService
  ){
    
  }

  ngOnInit() {
    console.log('id_tec en ngOnInit:', this.id_tec);
    this.cargarComponentesTecnologico(this.id_tec)
    this.cargarComponentesRepotencia()
  }
  
  cargarComponentesTecnologico(tec_id: any) {
    this.entidadGeneral.loadComponentesDetalleTecnologico(tec_id).subscribe(
      (data) => {
        const mappedData = data.map((item: any) => ({
          ...item,
          comn_codigo_bien: item.componenteNuevo?.com_codigo_bien || '',
          comn_codigo_uta: item.componenteNuevo?.com_codigo_uta || '',
          comn_marca: item.componenteNuevo?.mar_nombre || '',
          comn_serie: item.componenteNuevo?.com_serie || '',
          comn_modelo: item.componenteNuevo?.com_modelo || '',
          comn_subcategoria: item.componenteNuevo?.det_cat_nombre || '',
          comn_caracteristica: item.componenteNuevo?.com_caracteristica || '',
          comn_dependencia: item.componenteNuevo?.dep_nombre || '',
          comn_anio_ingreso: item.componenteNuevo?.com_anio_ingreso || '',
          comn_estado: item.componenteNuevo?.com_estado || '',
        }));
        this.data = mappedData;
        console.log(this.data);
      },
      (error) => {
        console.log(error);
      }
    );
}


  cargarComponentesRepotencia(){
    this.entidadComponente.loadComponentes().subscribe(data=>{
      this.componentes = data
    })
  }

  quitarComponente(componente:any){
    this.entidadDetalleTecnologico.removeDetalleTecnologico(componente).subscribe(()=>{
      this.cargarComponentesTecnologico(this.id_tec)
    })
  }

  openAumentarModal(component:any){
    this.individuoComponente = component
    this.modalAumentarOpen = true
  }

  closeAumentarModal(){
    this.modalAumentarOpen = false
  }

  selectItem(item: any) {
    if (this.selectedItem === item) {
      this.selectedItem = null;
    } else {
      this.selectedItem = item;
    }
    console.log('Item seleccionado:', this.selectedItem);
  }

  repotenciar(){
    const entidad = {componente_id:this.selectedItem.com_id, det_tec_id:this.individuoComponente.det_tec_id, det_repotencia:this.detalleRepotencia}
    this.entidadDetalleTecnologico.repotenciaComponente(entidad).subscribe(()=>{
      this.cargarComponentesTecnologico(this.id_tec)
      this.cargarComponentesRepotencia()
      this.closeAumentarModal()
    })
  }

  abrirFormulario(fila:any=null  ){
   const opciones={
     panelClass: 'panel-container',
     disableClose:true,
     data:fila
   }
   const referencia:MatDialogRef<ModalComponenteComponent>=this.dialog.open(ModalComponenteComponent,opciones)
   referencia.afterClosed().subscribe((form)=>{
    form.com_codigo_uta = null
    form.com_dep = this.row.tec_dep
    form.com_codigo_bien = this.row.tec_codigo
    form.com_anio_ingreso = this.row.tec_anio_ingreso
    this.entidadComponente.addComponente(form).subscribe(data => {
      const relacion = {det_tec_tec: this.id_tec, det_tec_com_adquirido: data.com_id,det_tec_com_uso:data.com_id }
      this.entidadDetalleTecnologico.addDetalleTecnologico(relacion).subscribe(data => {
        this.cargarComponentesTecnologico(this.id_tec)        
      },error => {
        console.log(error)
      })
    },error => {
      console.log(error)
    })
   }
   )
 }

 abrirFormularioRepotencia(fila:any=null  ){
  const opciones={
    panelClass: 'panel-container',
    disableClose:true,
    data:fila
  }
  const referencia:MatDialogRef<ModalRepotenciaComponent>=this.dialog.open(ModalRepotenciaComponent,opciones)
  referencia.afterClosed().subscribe((form)=>{
   form.com_codigo_bien = this.row.tec_codigo
   if (form.com_id == null){
    this.entidadComponente.addComponente(form).subscribe(data => {
      const relacion = {det_tec_tec: this.id_tec, det_tec_com_adquirido: data.com_id,det_tec_com_uso:data.com_id,det_tec_descripcion_repotencia: form.det_tec_descripcion_repotencia,det_tec_estado_repotencia : 1  }
      this.entidadDetalleTecnologico.addDetalleTecnologico(relacion).subscribe(data => {
        this.cargarComponentesTecnologico(this.id_tec)        
      },error => {
        console.log(error)
      })
    },error => {
      console.log(error)
    })
   }else{
    this.entidadComponente.updateComponentes(form.com_id,form).subscribe(()=>{
      this.cargarComponentesTecnologico(this.id_tec)
    })
   }
  }
  )
}

 isFormValid(){
  if(this.detalleRepotencia == '' || this.selectedItem == ''){
    return false
  }else{
    return true
  }
 }

 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  console.log(filterValue)
  this.entidadComponente.loadComponenteFiltro(filterValue).subscribe((data) => {
    this.componentes = data;
  });
  }

  getFieldValue(detalle: any, field: string): any {
    return field.split('.').reduce((acc, part) => acc && acc[part], detalle);
  }

}
