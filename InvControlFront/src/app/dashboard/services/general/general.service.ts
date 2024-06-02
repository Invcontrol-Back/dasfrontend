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
  loadReporteTecnologicoUbicacion(ubicacion:any){
    let url = 'http://localhost:8000/api/reporte/reporte_tecnologico_ubicacion/?ubicacion='
    return this.http.get(url+ubicacion)
  }
  loadReporteTecnologicoEncargado(encargado:any){
    let url = 'http://localhost:8000/api/reporte/reporte_tecnologico_encargado/?encargado='
    return this.http.get(url+encargado)
  }
}
