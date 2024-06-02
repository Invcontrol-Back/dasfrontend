import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponenteService {

  url = 'http://127.0.0.1:8000/api/componente/'
  constructor(private http:HttpClient) {
  }

  addComponente(entidad:any):Observable<any>{
    return this.http.post(this.url,entidad)
  }

  loadComponentes():Observable<any>{
    return this.http.get(this.url)
  }

  loadComponente(id:any):Observable<any>{
    const url_complementaria = 'obtenerComponentesEspecificos/?componente='
    return this.http.get(this.url+url_complementaria+id)
  }

  updateComponentes(id:any,entidad:any):Observable<any>{
    return this.http.put(this.url+id+"/",entidad)
  }

  deleteComponentes(id:any):Observable<any>{
    return this.http.delete(this.url+id+"/")
  }
}
