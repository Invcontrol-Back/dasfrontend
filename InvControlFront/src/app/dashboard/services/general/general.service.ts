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
}
