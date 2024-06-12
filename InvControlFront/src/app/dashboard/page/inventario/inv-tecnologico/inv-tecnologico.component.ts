import { Component } from '@angular/core';
import { TecnologicoService } from 'src/app/dashboard/services/tecnologico/tecnologico.service';
import { MetaDataColumn } from 'src/app/dashboard/share/interfaces/metacolumn.interface';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponenteComponent } from '../shared/modal-componente/modal-componente.component';
import { FormTecnologicoComponent } from './form-tecnologico/form-tecnologico.component';
import { ModalTableComponenteComponent } from '../shared/modal-table-componente/modal-table-componente.component';
import { GeneralService } from 'src/app/dashboard/services/general/general.service';

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

  data:any[] =[]

  metaDataColumns:MetaDataColumn[] = [
    {field:"tec_codigo", title:"CODIGO"},
    {field:"tec_serie", title:"SERIE"},
    {field:"tec_modelo", title:"MODELO"},
    {field:"mar_nombre", title:"MARCA"},
    {field:"tec_ip", title:"IP"},
    {field:"tec_anio_ingreso", title:"AÑO DE INGRESO"},
    {field:"fullName", title:"ENCARGADO"},
    {field:"cat_nombre", title:"CATEGORIA"},
    {field:"loc_nombre", title:"LOCALIZACION"},
    {field:"dep_nombre", title:"DEPENDENCIA"},
    {field:"tec_descripcion", title:"DESCRIPCION"},
    
  ]
  
 constructor(private dialog:MatDialog,private entidadTecnologico:TecnologicoService,private entidadGeneral:GeneralService ){
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

abrirTablaComponentes(row:any=null){
  const opciones={
    panelClass: 'panel-container',
    disableClose:true,
    id_tec:row.tec_id
  }
  const referencia:MatDialogRef<ModalTableComponenteComponent>=this.dialog.open(ModalTableComponenteComponent,opciones)
  referencia.componentInstance.id_tec = row.tec_id
  referencia.componentInstance.row = row
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
    this.data = data.map((item:any) => ({
      ...item,
      fullName: `${item.usu_nombres} ${item.usu_apellidos}`
    }));
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

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  console.log(filterValue)
  this.entidadTecnologico.loadTecnologicoFiltro(filterValue).subscribe((data) => {
    this.data = data;
  });
}

}
