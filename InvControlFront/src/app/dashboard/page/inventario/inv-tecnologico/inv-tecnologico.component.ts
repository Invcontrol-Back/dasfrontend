import { Component } from '@angular/core';
import { TecnologicoService } from 'src/app/dashboard/services/tecnologico/tecnologico.service';
import { MetaDataColumn } from 'src/app/dashboard/share/interfaces/metacolumn.interface';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponenteComponent } from '../shared/modal-componente/modal-componente.component';
import { FormTecnologicoComponent } from './form-tecnologico/form-tecnologico.component';
import { ModalTableComponenteComponent } from '../shared/modal-table-componente/modal-table-componente.component';

@Component({
  selector: 'app-inv-tecnologico',
  templateUrl: './inv-tecnologico.component.html',
  styleUrls: ['./inv-tecnologico.component.css']
})


export class InvTecnologicoComponent {
  tec_codigo: string = '';
  tec_serie: string = '';
  tec_modelo: string = '';
  tec_marca: string = '';
  tec_ip: string = '';
  tec_anio_ingreso: string = '';
  tec_encargado_id: string = '';
  tec_loc_id: string = '';
  tec_cat_id: string = '';
  tec_dep_id: string = '';
  tec_elimnado: string = '';
  idRow: string = '';

  data:any[] =[{
    tec_id: 1,
    tec_codigo: "codigo1",
    tec_serie: "serie1",
    tec_modelo: "modelo1",
    tec_marca: "marca1",
    tec_ip: '129.166.25',
    tec_anio_ingreso: 2020,
    tec_encargado: 10,
    tec_loc: 20,
    tec_cat: 30,
    tec_dep: 40,
  }]

  metaDataColumns:MetaDataColumn[] = [
    {field:"tec_codigo", title:"CODIGO"},
    {field:"tec_serie", title:"SERIE"},
    {field:"tec_modelo", title:"MODELO"},
    {field:"tec_marca", title:"MARCA"},
    {field:"tec_ip", title:"IP"},
    {field:"tec_anio_ingreso", title:"AÑO DE INGRESO"},
    {field:"usu_nombres", title:"ENCARGADO"},
    {field:"cat_nombre", title:"CATEGORIA"},
    {field:"loc_nombre", title:"LOCALIZACION"},
    {field:"dep_nombre", title:"DEPENDENCIA"},
    
  ]
  
 constructor(private dialog:MatDialog,private entidadTecnologico:TecnologicoService ){
  this.loadTecnologias()
 }

 abrirFormulario(fila:any=null  ){
  const opciones={
    panelClass: 'panel-container',
    disableClose:true,
    data:fila
  }
  const referencia:MatDialogRef<FormTecnologicoComponent>=this.dialog.open(FormTecnologicoComponent,opciones)
  referencia.afterClosed().subscribe((form)=>{
    if(form.tec_id){
      this.entidadTecnologico.updateTecnologia(form.tec_id,form).subscribe(data => {
        this.loadTecnologias()
      },error => {
        console.log(error)
      })
    }else{
      this.entidadTecnologico.addTecnologia(form).subscribe(data => {
        this.loadTecnologias()
      },error => {
        console.log(error)
      })
    }
  }

  )
}

abrirTablaComponentes(fila:any=null){
  const opciones={
    panelClass: 'panel-container',
    disableClose:true,
    data:fila
  }
  const referencia:MatDialogRef<ModalTableComponenteComponent>=this.dialog.open(ModalTableComponenteComponent,opciones)
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
 
loadTecnologias(){
  this.entidadTecnologico.getTecnologias().subscribe(data => {
    this.data = data
    console.log(data)
  },error => {
    console.log(error)
  })
}

eliminarRegistro(row:any){
  this.entidadTecnologico.deleteTecnologia(row.tec_id).subscribe(data => {
    this.loadTecnologias()
  },error => {
    console.log(error)
  })
}

}
