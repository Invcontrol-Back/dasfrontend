import { Component } from '@angular/core';
import { TecnologicoService } from 'src/app/dashboard/services/tecnologico/tecnologico.service';
import { MetaDataColumn } from 'src/app/dashboard/share/interfaces/metacolumn.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-inv-tecnologico',
  templateUrl: './inv-tecnologico.component.html',
  styleUrls: ['./inv-tecnologico.component.css']
})


export class InvTecnologicoComponent {

  titleText: string = 'CREAR TECNOLOGÍA';
  tec_codigo: string = '';
  tec_serie: string = '';
  tec_modelo: string = '';
  tec_marca: string = '';
  tec_ip: string = '';
  tec_anio_ingreso: string = '';
  tec_encargado_nombre: string = '';
  tec_categoria_nombre: string = '';
  tec_loc_nombre: string = '';
  tec_dep_nombre: string = '';
  tec_disponible: string = '';
  idRow: string = '';

  data:any[] = [{
    tec_codigo: "001",
    tec_serie: "S123",
    tec_modelo: "M456",
    tec_marca: "MarcaX",
    tec_ip: "192.168.1.1",
    tec_anio_ingreso: "2020",
    tec_encargado_nombre: "Juan Perez",
    tec_categoria_nombre: "Categoria1",
    tec_loc_nombre: "Localizacion1",
    tec_dep_nombre: "Dependencia1",
    tec_disponible: "Si"
  },
  {
    tec_codigo: "002",
    tec_serie: "S12347",
    tec_modelo: "M4568",
    tec_marca: "DELL",
    tec_ip: "192.168.1.15",
    tec_anio_ingreso: "2022",
    tec_encargado_nombre: "Juan Perez",
    tec_categoria_nombre: "Categoria1",
    tec_loc_nombre: "Localizacion1",
    tec_dep_nombre: "Dependencia1",
    tec_disponible: "Si"
  },]
  metaDataColumns:MetaDataColumn[] = [
    {field:"tec_codigo", title:"CODIGO"},
    {field:"tec_serie", title:"SERIE"},
    {field:"tec_modelo", title:"MODELO"},
    {field:"tec_marca", title:"MARCA"},
    {field:"tec_ip", title:"IP"},
    {field:"tec_anio_ingreso", title:"AÑO DE INGRESO"},
    {field:"tec_encargado_nombre", title:"ENCARGADO"},
    {field:"tec_categoria_nombre", title:"CATEGORIA"},
    {field:"tec_loc_nombre", title:"LOCALIZACION"},
    {field:"tec_dep_nombre", title:"DEPENDENCIA"},
    {field:"tec_disponible", title:"DISPONIBLE"},
    
  ]
  
 
  
}
