import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoUbicacion } from '../../share/models/tipoUbicacion.model';

@Injectable({
  providedIn: 'root'
})
export class TipoUbicacionService {

  url = 'http://127.0.0.1:8000/api/tipoUbi/'
  constructor(private http:HttpClient) {
   }

  loadTipoUbicaciones():Observable<any> {
    return this.http.get(this.url)
  }

  loadTipoUbicacion(id:string):Observable<any> {
    return this.http.get(this.url+id)
  }

  addTipoUbicacion(entidad:TipoUbicacion):Observable<any>{
    return this.http.post(this.url,entidad)
  }

  updateTipoUbicacion(id:string, entidad:TipoUbicacion):Observable<any>{
    return this.http.put(this.url+id,entidad)
  }

  deleteTipoUbicacion(id:string):Observable<any> {
    return this.http.delete(this.url+id)
  }
}
