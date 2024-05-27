import { Component } from '@angular/core';
import { MetaDataColumn } from 'src/app/dashboard/share/interfaces/metacolumn.interface';
import { ModalComponenteComponent } from '../modal-componente/modal-componente.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


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

data: any[] =[
  {
    com_id: '1',
    com_serie: 'serie1',
    com_codigo_bien: 'bien1',
    com_codigo_uta: 'uta1',
    com_det_cat_id: 'cat1',
    com_modelo: 'modelo1',
    com_marca: 'marca1',
    com_caracteristica: 'caracteristica1',
    com_dep_id: 'dep1',
    com_anio_ingreso: '2020',
    com_eliminado: 'no',
   
  },
  {
    com_id: '2',
    com_serie: 'serie2',
    com_codigo_bien: 'bien2',
    com_codigo_uta: 'uta2',
    com_det_cat_id: 'cat2',
    com_modelo: 'modelo2',
    com_marca: 'marca2',
    com_caracteristica: 'caracteristica2',
    com_dep_id: 'dep2',
    com_anio_ingreso: '2021',
    com_eliminado: 'no',
    
  },

]

  metaDataColumns : MetaDataColumn[]=[
    {field:"com_id", title:"ID"},
    {field:"com_serie", title:"SERIE"},
    {field:"com_codigo_bien", title:"CODIGO BIEN"},
    {field:"com_codigo_uta", title:"CODIGO UTA"},
    {field:"com_det_cat_id", title:"DETALLE CATEGORIA ID"},
    {field:"com_modelo", title:"MODELO"},
    {field:"com_marca", title:"MARCA"},
    {field:"com_caracteristica", title:"CARACTERISTICA"},
    {field:"com_dep_id", title:"DEPARTAMENTO ID"},
    {field:"com_anio_ingreso", title:"AÑO DE INGRESO"},
    {field:"com_eliminado", title:"ELIMINADO"},
  ];
  

  constructor(private dialog:MatDialog ){
  
  }
  abrirFormulario(fila:any=null  ){
   const opciones={
     panelClass: 'panel-container',
     disableClose:true,
     data:fila
   }
   const referencia:MatDialogRef<ModalComponenteComponent>=this.dialog.open(ModalComponenteComponent,opciones)
   referencia.afterClosed().subscribe((form)=>{
     if(form.id){
       //editar
       
       const ccomponente = { ...form };
   
      
      
       
       
     }else{
       //this.nuevoCliente(form)
     }
   }
 
   )
 }

}
