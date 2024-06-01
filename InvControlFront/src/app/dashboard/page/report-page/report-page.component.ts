import { Component } from '@angular/core';
import { MetaDataColumn } from '../../share/interfaces/metacolumn.interface';
import { TipoUbicacionService } from '../../services/tipoUbicacion/tipo-ubicacion.service';
import { SoftwareService } from '../../services/software/software.service';
import { MatSelectChange } from '@angular/material/select';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { UbicacionService } from '../../services/ubicacion/ubicacion.service';
import { GeneralService } from '../../services/general/general.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TecnologicoService } from '../../services/tecnologico/tecnologico.service';
import { PageOrientation } from 'pdfmake/interfaces';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.css'],
  
})
export class ReportPageComponent {

  modalOpen: boolean = false;
  modalDeleteOpen: boolean = false;

  titleText: string = 'GENERAR REPORTES';
  encargadoText: string = '';
  encargadoDisplayText: string = 'Encargado';
  tipoReporteSeleccionado: string = '';
  detalleSeleccionado: string = '';
  encargadoSeleccionado: string = '';
  laboratorioSeleccionado: string = '';
  idRow: string = '';

  mostrarTipoInformacion:boolean = false
  mostrarEncargados:boolean= false
  mostrarUbicaciones:boolean=false

  tipoReporte: any[] = [
    { id: 'TECNOLOGICO', nombre: 'TECNOLOGICO' },
    { id: 'INMOBILIARIO', nombre: 'INMOBILIARIO' },
    { id: 'SOFTWARE', nombre: 'SOFTWARE' },
  ];

  detalleUno: any[] = [];
  encargados: any[] = [];
  laboratorios: any[] = [];

  data: any[] = [
    { codigo: '663131', generadoPor: 'Kevin Saquinga', fechaGenerado: '14/04/2024' },
    { codigo: '663131', generadoPor: 'Kevin Saquinga', fechaGenerado: '14/04/2024' },
    { codigo: '663131', generadoPor: 'Kevin Saquinga', fechaGenerado: '14/04/2024' }
  ];

  metaDataColumns: MetaDataColumn[] = [
    { field: "codigo", title: "Codigo" },
    { field: "generadoPor", title: "Generado por" },
    { field: "fechaGenerado", title: "Fecha generado" }
  ];

  constructor(private entidadEncargado:UsuarioService,private entidadUbicacion:UbicacionService,private entidadGeneral:GeneralService,
    private entidadTecnologico:TecnologicoService
  ) {
    this.loadUsuarios()
    this.loadUbicaciones()
  }

  loadUsuarios(){
    this.entidadEncargado.loadUsuarios().subscribe(data=>{
      this.encargados = data
    })
  }
  loadUbicaciones(){
    this.entidadUbicacion.loadLocations().subscribe(data=>{
      this.laboratorios = data
    })
  }

  onTipoReporteChange(event: MatSelectChange) {
    console.log('El tipo de reporte seleccionado es:', event.value);
    this.mostrarTipoInformacion = true
    if (event.value=='TECNOLOGICO'){
      this.detalleUno = [
        {id:"UBICACION",nombre:"UBICACION"},
        {id:"ENCARGADO",nombre:"ENCARGADO"},
        {id:"ETIQUETAS",nombre:"ETIQUETAS"},
        {id:"GENERAL",nombre:"GENERAL"},
      ]
    }else if (event.value=='INMOBILIARIO'){
      this.detalleUno = [
        {id:"ENCARGADO",nombre:"ENCARGADO"},
        {id:"GENERAL",nombre:"GENERAL"},
      ]
    }else if(event.value=='SOFTWARE'){
      this.detalleUno = [
        {id:"GENERAL",nombre:"GENERAL"},
      ]  
    }else{
      console.log("reporte no especificado")
    }
  }

  onTipoInformacionChange(event:MatSelectChange){
    if (event.value == 'ENCARGADO'){
      this.mostrarEncargados = true
      this.mostrarUbicaciones = false
    }else if (event.value == 'UBICACION'){
      this.mostrarEncargados = false
      this.mostrarUbicaciones = true
    }else if(event.value=='ETIQUETAS'){
      this.mostrarEncargados = false
      this.mostrarUbicaciones = true
    }
    else{
      this.mostrarEncargados = false
      this.mostrarUbicaciones = false
    }
  }

  openModal(action: string, row: any) {
    if (action === 'crear') {
      this.titleText = 'GENERAR REPORTES';
      this.encargadoText = '';
      this.tipoReporteSeleccionado = '';
      this.detalleSeleccionado = '';
      this.encargadoSeleccionado = '';
    }
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  closeDeleteModal() {
    this.modalDeleteOpen = false;
  }

  openDeleteModal(row: any) {
    this.idRow = row.codigo;
    this.modalDeleteOpen = true;
  }

  deleteData() {
    this.data = this.data.filter(item => item.codigo !== this.idRow);
    this.closeDeleteModal();
  }

  generateReport() {

    if (this.tipoReporteSeleccionado =='TECNOLOGICO'){
      if(this.detalleSeleccionado == 'ETIQUETAS'){
        if(this.laboratorioSeleccionado !=''){
          this.reporteEtiquetas()
        }
      }else if(this.detalleSeleccionado == 'GENERAL'){
          this.reporteGeneralTecnologico()
      }

    }else if (this.tipoReporteSeleccionado =='INMOBILIARIO'){

    }else if (this.tipoReporteSeleccionado == 'SOFTWARE'){

    }else{
      console.log("no especificado")
    }

  }
  //REPORTE GENERAL

  reporteGeneralTecnologico() {
    this.entidadTecnologico.getTecnologias().subscribe(data => {
      const content: any =  [
        {
          layout: 'lightHorizontalLines', // opcional
          table: {
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*','auto' ],
            body: this.lecturaFilasTecnologicos(data)
            
          }
        }
      ];
      const documentDefinition: any = {
        pageOrientation: 'landscape',
        content: content,
      };

      (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(documentDefinition).download('reporte.pdf');
    });
  }

  lecturaFilasTecnologicos(data:any){
    const json:any = []
    data.forEach((row: any) => {
      json.push(
        [ row.tec_codigo, row.cat_nombre, row.tec_serie,row.tec_modelo,row.tec_marca]
      )
    })
    return json;
  }

  //FIN REPORTE GENERAL

  //REPORTE ETIQUETAS
  reporteEtiquetas() {
    this.entidadGeneral.loadReporteEtiqueta(this.laboratorioSeleccionado).subscribe((data: any) => {
      const contenido = [
        {
          columns: 
              this.agregarColumnaReporteEtiqueta(data)
          ,
          columnGap: 10
        },
      ];
      const documentDefinition = {
        content: contenido,
      };
      (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(documentDefinition).download('reporte.pdf');
    });
  }
  
  agregarColumnaReporteEtiqueta(data:any){
    const json:any = []
    data.forEach((row: any) => {
      json.push(
        {
          width: 'auto',
          text: "UNIVERSIDAD TECNICA DE AMBATO\nCodigo : " 
            + row.tec_codigo + "\nEtiqueta :" 
            + row.loc_nombre,
        },{
          width: 'auto',
          qr: row.tec_codigo,alignment: 'center',margin:5, fit: '50'
        },
      )
    })
    return json;
  }
  //FIN REPORTE ETIQUETAS


  isFormValid(): boolean {
    return this.tipoReporteSeleccionado.trim() !== '' && this.detalleSeleccionado.trim() !== '';
  }

}
