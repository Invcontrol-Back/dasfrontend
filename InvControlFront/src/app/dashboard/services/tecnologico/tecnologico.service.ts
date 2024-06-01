import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TecnologicoService {

  url = 'http://127.0.0.1:8000/api/tecnologico/'
  constructor(private http:HttpClient) {
   }

  getTecnologias():Observable<any> {
    return this.http.get(this.url)
  }

  loadTecnologia(id:string):Observable<any> {
    return this.http.get(this.url+id)
  }

  addTecnologia(entidad:any):Observable<any>{
    return this.http.post(this.url,entidad)
  }

  updateTecnologia(id:string, entidad:any):Observable<any>{
    return this.http.put(this.url+id+'/',entidad)
  }

  deleteTecnologia(id:string):Observable<any> {
    return this.http.delete(this.url+id+"/")
  }

  obtenerTecnologicoEncargado(encargado:any):Observable<any>{
    const url_complementaria = 'obtener_tecnologico_encargado/?encargado='
    return this.http.get(this.url+url_complementaria+encargado)
  }
}
