import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http:HttpClient) {
   }

   loadComponentesDetalleTecnologico(idTecnologico:any):Observable<any> {
    let url = 'http://127.0.0.1:8000/api/detalleC/?parametro='
    return this.http.get(url+idTecnologico)
  }

  loadReporteEtiqueta(ubicacion:any){
    let url = 'http://localhost:8000/api/reporte/reporte_etiquetas/?ubicacion='
    return this.http.get(url+ubicacion)
  }
  loadReporteTecnologicoGeneral(){
    let url = 'http://localhost:8000/api/reporte/reporte_tecnologico_general/?'
    return this.http.get(url)
  }

  loadReporteTecnologicoDITIC(){
    let url = 'http://localhost:8000/api/reporte/reporte_tecnologico_ditic/?'
    return this.http.get(url)
  }

  loadReporteUPE(){
    let url = 'http://localhost:8000/api/reporte/reporte_upe/?'
    return this.http.get(url)
  }

  loadReporteTecnologicoUbicacion(ubicacion:any){
    let url = 'http://localhost:8000/api/reporte/reporte_tecnologico_ubicacion/?ubicacion='
    return this.http.get(url+ubicacion)
  }
  loadReporteTecnologicoEncargado(encargado:any){
    let url = 'http://localhost:8000/api/reporte/reporte_tecnologico_encargado/?encargado='
    return this.http.get(url+encargado)
  }

  loadDashboardTecnologico(){
    let url = 'http://localhost:8000/api/reporte/estadistica_tecnologico/'
    return this.http.get(url)
  }
  loadDashboardSoftware(){
    let url = 'http://localhost:8000/api/reporte/estadistica_software/'
    return this.http.get(url)
  }
  loadDashboardInmueble(){
    let url = 'http://localhost:8000/api/reporte/estadistica_inmueble/'
    return this.http.get(url)
  }
  loadDashboardUsuario(){
    let url = 'http://localhost:8000/api/reporte/estadistica_usuario/'
    return this.http.get(url)
  }
  loadEstInmobiliario(){
    let url = 'http://127.0.0.1:8000/api/reporte/estadistica_categoria_inmobiliario/'
    return this.http.get<any>(url)
  }
  loadEstTecnologico(){
    let url = 'http://127.0.0.1:8000/api/reporte/estadistica_categoria_tecnologico/'
    return this.http.get<any>(url)
  }


}
