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
  
      (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(documentDefinition).download('reporte.pdf');
    })
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

  //FIN REPORTE SOFTWARE GENERAL

  //REPORTE GENERAL INMUEBLE
  reporteGeneralInmobiliario(){
    this.entidadInmueble.loadInmobiliarios().subscribe(data=>{
      this.configuracionInmueble(data)
    })
  }
  //FIN REPORTE GENERAL INMUEBLE

  //REPORTE ENCARGADO INMUEBLE
  reporteEncargadoInmobiliario(){
    this.entidadInmueble.obtenerInmueblesEncargado(this.encargadoSeleccionado).subscribe(data=>{
      this.configuracionInmueble(data)
    })
  }
  //FIN REPORTE ENCARGADO INMUEBLE

  configuracionInmueble(data:any){
    const content: any =  [
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: [ '*', '*', '*', '*','*','*', '*', '*', '*'],
          body: this.lecturaFilas(data)
          
        }
      }
    ];
    const documentDefinition: any = {
      pageOrientation: 'landscape',
      content: content,
    };

    (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(documentDefinition).download('reporte.pdf');
  }

  lecturaFilas(data:any){
    const json:any = [ ['CODIGO','CATEGORIA','SERIE','MODELO','MARCA','AÑO INGRESO','DEPENDENCIA','ENCARGADO'] ]
    data.forEach((row: any) => {
      json.push(
        [ row.inm_codigo, row.cat_nombre,row.inm_serie,row.inm_modelo,row.inm_marca,row.inm_anio_ingreso,row.dep_nombre,row.usu_nombres + ' ' +row.usu_apellidos]
      )
    })
    return json;
  }

  //REPORTE ENCARGADO TECNOLOGICO
  reporteEncargadoTecnologico(){
    this.entidadGeneral.loadReporteTecnologicoEncargado(this.encargadoSeleccionado).subscribe(data=>{
      this.reporteTecnologico(data)
    })
  }
  //FIN REPORTE ENCARGADO TECNOLOGICO

  //REPORTE UBICAICON TECNOLOGICO
  reporteUbicacionTecnologico(){
    this.entidadGeneral.loadReporteTecnologicoUbicacion(this.laboratorioSeleccionado).subscribe(data=>{
      this.reporteTecnologico(data)
    })
  }
  //FIN REPORTE UBICACION TECNOLOGICO

  //REPORTE GENERAL TECNOLOGICO
  reporteGeneralTecnologico() {
    this.entidadGeneral.loadReporteTecnologicoGeneral().subscribe(data => {
      this.reporteTecnologico(data)
    });
  }
  //FIN REPORTE GENERAL TECNOLOGICO

  //METODO REPORTES TECNOLOGICOS
  reporteTecnologico(data:any){
    if (!Array.isArray(data)) {
      console.error('La data recibida no es un array:', data);
      return;
    }
    const dataObservables = data.map(row => {
      return this.entidadGeneral.loadComponentesDetalleTecnologico(row.tec_id).pipe(
        switchMap(dataComponentes => {
          console.log(dataComponentes)
          const componentesObservables = dataComponentes.map((componentesRow: any) => {
            const repotencia = of({ descripcion: componentesRow.det_tec_descripcion_repotencia ?? 'Sin descripción' });
            const repotenciado = of({ estado: componentesRow.det_tec_estado_repotencia === 0 ? 'no repotenciado' : 'repotenciado' });
            return forkJoin({
              componenteAnterior: this.entidadComponentes.loadComponente(componentesRow.det_tec_com_adquirido_id),
              componenteNuevo: this.entidadComponentes.loadComponente(componentesRow.det_tec_com_uso_id),
              repotencia: repotencia,
              repotenciado: repotenciado
            }).pipe(
              map(componentes => ({
                componenteAnterior: componentes.componenteAnterior,
                componenteNuevo: componentes.componenteNuevo,
                repotencia:componentes.repotencia,
                repotenciado:componentes.repotenciado
              }))
            );
          });

          console.log(componentesObservables)
          return forkJoin(componentesObservables).pipe(
            
            map((componentes:any) => {
              console.log('Valores de repotencia y repotenciado:', componentes);
              const componentesAnterior = componentes.map((comp:any) => 
                `Anterior: ${JSON.stringify(comp.componenteAnterior)}`
              ).join(' | ');
              const componenteNuevo = componentes.map((comp:any) => 
                `Nuevo: ${JSON.stringify(comp.componenteNuevo)}`
              ).join(' | ');
              const rep = componentes.map((comp:any) => 
                `${JSON.stringify(comp.repotencia)}`
              ).join(' | ');
              const repo = componentes.map((comp:any) => 
                `${JSON.stringify(comp.repotenciado)}`
              ).join(' | ');
              row.componentesA = componentesAnterior;
              row.componentesN = componenteNuevo;
              row.repotencia = rep
              row.repotenciado = repo
              return row;
            })
          );
        })
      );
    });

    forkJoin(dataObservables).subscribe(mergedData => {
      const filteredData = mergedData.map(item => {
        return {
          codigo: item.tec_codigo,
          serie: item.tec_serie,
          modelo: item.tec_modelo,
          marca: item.tec_marca,
          ip: item.tec_ip,
          año_ingreso: item.tec_anio_ingreso,
          dependencia: item.dep_nombre,
          categoria: item.cat_nombre,
          encargado: item.usu_persona,
          bloque: item.blo_nombre,
          ubicacion: item.ubi_nombre,
          etiqueta: item.loc_nombre,
          componentesAnterior: item.componentesA,
          componentesNuevo: item.componentesN ,
          repotencia:item.repotencia,
          repotenciado:item.repotenciado
        };
      });

      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook: XLSX.WorkBook = {
        Sheets: { 'Datos Tecnologicos': worksheet },
        SheetNames: ['Datos Tecnologicos']
      };

      // Escribir el archivo de Excel
      XLSX.writeFile(workbook, 'reporte_tecnologico.xlsx');
    });
  }
  //FIN METODO REPORTES TECNOLOGICOS

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
