import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleTecnologicoService {


  url = 'http://127.0.0.1:8000/api/detalletecnologico/'
  constructor(private http:HttpClient) {
  }

  addDetalleTecnologico(entidad:any):Observable<any>{
    return this.http.post(this.url,entidad)
  }

  removeDetalleTecnologico(entidad:any):Observable<any>{
    return this.http.delete(this.url+entidad.com_id+'/')
  }

  repotenciaComponente(entidad:any):Observable<any>{
    const url_complementaria = 'repotenciar/'
    return this.http.patch(this.url+url_complementaria,entidad)
  }
}
