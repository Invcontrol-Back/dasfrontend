import { Component } from '@angular/core';
import { MetaDataColumn } from 'src/app/dashboard/share/interfaces/metacolumn.interface';
import { ModalComponenteComponent } from '../modal-componente/modal-componente.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GeneralService } from 'src/app/dashboard/services/general/general.service';
import { ComponenteService } from 'src/app/dashboard/services/componente/componente.service';
import { DetalleTecnologicoService } from 'src/app/dashboard/services/detalleTecnologico/detalle-tecnologico.service';


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

  row:any
  id_tec :any

  data: any[] =[
  
  ]

  metaDataColumns : MetaDataColumn[]=[
    {field:"com_serie", title:"SERIE"},
    {field:"com_codigo_bien", title:"CODIGO BIEN"},
    {field:"com_codigo_uta", title:"CODIGO UTA"},
    {field:"det_cat_nombre", title:"SUBCATEGORIA"},
    {field:"com_modelo", title:"MODELO"},
    {field:"com_marca", title:"MARCA"},
    {field:"com_caracteristica", title:"CARACTERISTICA"},
    {field:"dep_nombre", title:"DEPENDENCIA"},
    {field:"com_anio_ingreso", title:"AÑO DE INGRESO"},
  ];
  

  constructor(private dialog:MatDialog ,private entidadGeneral:GeneralService,private entidadComponente:ComponenteService,
    private entidadDetalleTecnologico:DetalleTecnologicoService
  ){
  }

  ngOnInit() {
    console.log('id_tec en ngOnInit:', this.id_tec);
    this.cargarComponentesTecnologico(this.id_tec)
    
    
  }
  
  cargarComponentesTecnologico(tec_id:any){
    this.entidadGeneral.loadComponentesDetalleTecnologico(tec_id).subscribe(data => {
      this.data = data
    },error => {
      console.log(error)
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

}
