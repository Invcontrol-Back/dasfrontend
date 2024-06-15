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
import * as XLSX from 'xlsx';
import { ComponenteService } from '../../services/componente/componente.service';
import { of, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { InmobiliarioService } from '../../services/inmobiliario/inmobiliario.service';


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
  documentoSeleccionado:string = '';
  idRow: string = '';

  mostrarTipoInformacion:boolean = false
  mostrarEncargados:boolean= false
  mostrarUbicaciones:boolean=false
  mostrarDocumento:boolean = false

  tipoReporte: any[] = [
    { id: 'TECNOLOGICO', nombre: 'TECNOLOGICO' },
    { id: 'INMOBILIARIO', nombre: 'INMOBILIARIO' },
    { id: 'SOFTWARE', nombre: 'SOFTWARE' },
  ];

  detalleUno: any[] = [];
  encargados: any[] = [];
  laboratorios: any[] = [];
  documento:any[] =[
    { id: 'PDF', nombre: 'PDF' },
    { id: 'EXCEL', nombre: 'EXCEL' },
  ]

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

  constructor(private entidadEncargado:UsuarioService,private entidadUbicacion:UbicacionService,private entidadGeneral:GeneralService,private entidadComponentes:ComponenteService,
    private entidadInmueble:InmobiliarioService,private entidadSoftware:SoftwareService

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
        {id:"DITIC",nombre:"DITIC"},
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
      this.mostrarDocumento = true
    }else if (event.value == 'UBICACION'){
      this.mostrarEncargados = false
      this.mostrarUbicaciones = true
      this.mostrarDocumento = true
    }else if(event.value=='ETIQUETAS'){
      this.mostrarEncargados = false
      this.mostrarUbicaciones = true
      this.mostrarDocumento = false
      this.documentoSeleccionado='PDF'
    }
    else{
      this.mostrarEncargados = false
      this.mostrarUbicaciones = false
      this.mostrarDocumento = true
    }
    
  }

  openModal(action: string, row: any) {
    if (action === 'crear') {
      this.titleText = 'GENERAR REPORTES';
      this.encargadoText = '';
      this.tipoReporteSeleccionado = '';
      this.detalleSeleccionado = '';
      this.encargadoSeleccionado = '';
      this.documentoSeleccionado='';
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
      }else if(this.detalleSeleccionado =='DITIC'){
          this.reporteDITIC()
      }else if(this.detalleSeleccionado == 'UBICACION'){
          this.reporteUbicacionTecnologico()
      }else if(this.detalleSeleccionado =='ENCARGADO'){
          this.reporteEncargadoTecnologico()
      }
    }else if (this.tipoReporteSeleccionado =='INMOBILIARIO'){
      if(this.detalleSeleccionado =='GENERAL'){
        this.reporteGeneralInmobiliario()
      }else if (this.detalleSeleccionado == 'ENCARGADO'){
        this.reporteEncargadoInmobiliario()
      }
    }else if (this.tipoReporteSeleccionado == 'SOFTWARE'){
      this.reporteSoftwareGeneral()
    }else{
      console.log("no especificado")
    }

  }
  
  //REPORTE SOFTWARE GENERAL
  reporteSoftwareGeneral() {
    this.entidadSoftware.loadSoftwares().subscribe(data => {
      if (this.documentoSeleccionado==='EXCEL'){
        const datosEstructurados = this.estructuraSoftware(data)
        this.exportToExcel(datosEstructurados,'reporteSoftwareGeneral')
      }else{
        const definicion = this.PDFSoftware(data)
        this.exportToPdf(definicion,'reporteSoftwareGeneral.pdf')
      }

    })
  }
  //FIN REPORTE SOFTWARE GENERAL

  //REPORTE GENERAL INMUEBLE
  reporteGeneralInmobiliario(){
    this.entidadInmueble.loadInmobiliarios().subscribe(data=>{
      if (this.documentoSeleccionado==='EXCEL'){
        const dataEstructurado = this.estructuraInmueble(data)
        this.exportToExcel(dataEstructurado,'reporteInmobiliarioGeneral')
      }else{
        const dataEstructurado = this.estructuraInmueble(data)
        const definicion = this.PDFInmueble(dataEstructurado)
        this.exportToPdf(definicion,'reporteInmobiliarioGeneral.pdf')
      }

    })
  }
  //FIN REPORTE GENERAL INMUEBLE

  //REPORTE ENCARGADO INMUEBLE
  reporteEncargadoInmobiliario(){
    this.entidadInmueble.obtenerInmueblesEncargado(this.encargadoSeleccionado).subscribe(data=>{
      if (this.documentoSeleccionado==='EXCEL'){
        const dataEstructurado = this.estructuraInmueble(data)
        this.exportToExcel(dataEstructurado,'reporteInmobiliarioEncargado')
      }else{
        const dataEstructurado = this.estructuraInmueble(data)
        const definicion = this.PDFInmueble(dataEstructurado)
        this.exportToPdf(definicion,'reporteInmobiliarioEncargado.pdf')
      }
    })
  }
  //FIN REPORTE ENCARGADO INMUEBLE

  //REPORTE ENCARGADO TECNOLOGICO
  reporteEncargadoTecnologico(){
    this.entidadGeneral.loadReporteTecnologicoEncargado(this.encargadoSeleccionado).subscribe(data=>{
      if (this.documentoSeleccionado === 'EXCEL'){
        const dataEstructurado = this.estructuraTecnologico(data)
        this.exportToExcel(dataEstructurado,'reporteEncargadoTecnologico')
      }else{
        const dataEstructurado = this.estructuraTecnologico(data)
        const definicion = this.PDFTecnologico(dataEstructurado)
        this.exportToPdf(definicion,'reporteEncargadoTecnologico.pdf')
      }
    })
  }
  //FIN REPORTE ENCARGADO TECNOLOGICO

  //REPORTE UBICAICON TECNOLOGICO
  reporteUbicacionTecnologico(){
    this.entidadGeneral.loadReporteTecnologicoUbicacion(this.laboratorioSeleccionado).subscribe(data=>{
      if (this.documentoSeleccionado === 'EXCEL'){
        const dataEstructurado = this.estructuraTecnologico(data)
        this.exportToExcel(dataEstructurado,'reporteUbicacionTecnologico')
      }else{
        const dataEstructurado = this.estructuraTecnologico(data)
        const definicion = this.PDFTecnologico(dataEstructurado)
        this.exportToPdf(definicion,'reporteUbicacionTecnologico.pdf')
      }
    })
  }
  //FIN REPORTE UBICACION TECNOLOGICO

  //REPORTE GENERAL TECNOLOGICO
  reporteGeneralTecnologico() {
    this.entidadGeneral.loadReporteTecnologicoGeneral().subscribe(data => {
      if (this.documentoSeleccionado === 'EXCEL'){
        const dataEstructurado = this.estructuraTecnologico(data)
        this.exportToExcel(dataEstructurado,'reporteGeneralTecnologico')
      }else{
        const dataEstructurado = this.estructuraTecnologico(data)
        const definicion = this.PDFTecnologico(dataEstructurado)
        this.exportToPdf(definicion,'reporteGeneralTecnologico.pdf')
      }
    });
  }
  //FIN REPORTE GENERAL TECNOLOGICO

  //REPORTE DITIC
  reporteDITIC(){
    this.entidadGeneral.loadReporteTecnologicoDITIC().subscribe(data => {
      if (this.documentoSeleccionado === 'EXCEL'){
        const dataEstructurado = this.estructuraTecnologico(data)
        this.exportToExcel(dataEstructurado,'reporteDITIC')
      }else{
        const dataEstructurado = this.estructuraTecnologico(data)
        const definicion = this.PDFTecnologico(dataEstructurado)
        this.exportToPdf(definicion,'reporteDITIC.pdf')
      }
    });
  }
  //FIN REPORTE DITIC

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
    return this.tipoReporteSeleccionado.trim() !== '' && this.detalleSeleccionado.trim() !== '' && this.documentoSeleccionado.trim() !== '';
  }

  exportToExcel(data: any, fileName: string): void {
  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Datos Tecnologicos': worksheet },
      SheetNames: ['Datos Tecnologicos']
    };
  
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }

  exportToPdf(definicion:any,fileName:string):void{
    (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(definicion).download(fileName);
  }
  
  estructuraTecnologico(data:any){
    const datosFiltrados = data.map((item:any) => {
      const componentes = item.detalles.map((detalle: any) => {
        const codigoUta = detalle.com_codigo_uta !== null ? `-${detalle.com_codigo_uta}` : '';
        return `${detalle.com_codigo_bien}${codigoUta}-${detalle.det_cat_nombre}`;
      }).join('\n'); 

      const repotencia = item.detalles
      .filter((detalle: any) => detalle.det_tec_estado_repotencia === '1')
      .map((detalle: any) => 
        detalle.det_tec_descripcion_repotencia
      ).join('\n')
  
      return {
        codigo: item.tec_codigo,
        marca: item.mar_nombre,
        modelo: item.tec_modelo,
        serie: item.tec_serie,
        ip: item.tec_ip,
        año_ingreso: item.tec_anio_ingreso,
        dependencia: item.dep_nombre,
        categoria: item.cat_nombre,
        encargado: item.usu_nombres + ' ' + item.usu_apellidos,
        bloque: item.blo_nombre,
        ubicacion: item.ubi_nombre,
        etiqueta: item.loc_nombre,
        componentes: componentes,
        repotencia:repotencia
      };
    });
    return datosFiltrados
  }
  estructuraSoftware(data:any){
    const datosFiltrados = data.map((item:any) => {
      return {
        software: item.sof_nombre,
        version: item.sof_version,
        tipo: item.sof_tipo,
        duracion: item.sof_duracion,
        descripcion: item.sof_descripcion,
        laboratorio: item.tip_ubi_nombre,
      };
    });
    return datosFiltrados
  }
  estructuraInmueble(data:any){
    const datosFiltrados = data.map((item:any) => {
      return {
        codigo: item.inm_codigo,
        categoria: item.cat_nombre,
        marca: item.mar_nombre,
        modelo: item.inm_modelo,
        serie: item.inm_serie,
        año_ingreso: item.inm_anio_ingreso,
        dependencia:item.dep_nombre,
        bloque:item.blo_nombre,
        ubicacion:item.ubi_nombre,
        etiqueta:item.loc_nombre,
        encargado: item.usu_nombres + ' '+item.usu_apellidos
      };
    });
    return datosFiltrados 
  }

  PDFSoftware(data:any){
    const content: any = [
      {text: 'ESPECIALIZACION', fontSize: 15,bold: true }
      ,
      {
        
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['*', '*', '*', '*', '*', '*'],
          body: this.lecturaFilasSoftware(data, 'ESPECIALIZACION')

        }
      }
      ,
      {text: 'COMPUTACION', fontSize: 15,bold: true }
      ,
      {
        
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['*', '*', '*', '*', '*', '*'],
          body: this.lecturaFilasSoftware(data, 'COMPUTACION')

        }
      }
    ];

    const documentDefinition: any = {
      pageOrientation: 'landscape',
      content: content,
    };

    return documentDefinition
  }

  lecturaFilasSoftware(data:any,tipo:string){
    const json:any = [ ['NOMBRE','VERSION','TIPO','DURACION','DESCRIPCION'] ]
    data.forEach((row: any) => {
      if(row.tip_ubi_nombre == tipo){
        json.push(
          [ row.sof_nombre,row.sof_version,row.sof_tipo,row.sof_duracion,row.sof_descripcion]
        )
      }
    })
    return json;
  }

  PDFInmueble(data:any){
    const content: any =  [
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: [ '*', '*', '*', '*','*','*', '*', '*', '*' ,'*'],
          body: this.lecturaFilasInmueble(data)
          
        }
      }
    ];
    const documentDefinition: any = {
      pageOrientation: 'landscape',
      content: content,
    };

    return documentDefinition
  }

  lecturaFilasInmueble(data:any){
    const json:any = [ ['CODIGO','CATEGORIA','MARCA','MODELO','SERIE','AÑO INGRESO','DEPENDENCIA','UBICACION','ENCARGADO'] ]
    data.forEach((row: any) => {
      json.push(
        [ row.codigo, row.categoria,row.marca,row.modelo,row.serie,row.año_ingreso,row.dependencia,(row.bloque+'\n'+row.ubicacion+'\n'+row.etiqueta),row.encargado]
      )
    })
    return json;
  }
  PDFTecnologico(data:any){
    const content: any =  [
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: [ '*', '*', '*', '*','*','*'],
          body: this.lecturaFilasTecnologico(data)
          
        }
      }
    ];
    const documentDefinition: any = {
      pageOrientation: 'landscape',
      content: content,
    };
    return documentDefinition
  }
  lecturaFilasTecnologico(data:any){
    const json:any = [ ['CODIGO','CARACTERISTICAS','ENCARGADO','UBICACION','COMPONENTES','REPOTENCIA'] ]
    data.forEach((row: any) => {
      json.push(
        [ row.codigo, (row.categoria+'\n'+row.marca +'\n'+ row.modelo +'\n'+row.serie +'\n'+row.ip + '\n' + row.año_ingreso +'\n'+row.dependencia),row.encargado,(row.bloque +'\n'+row.ubicacion +'\n'+ row.etiqueta),row.componentes,row.repotencia]
      )
    })
    return json;
  }
}
