import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  url = 'http://127.0.0.1:8000/api/laboratorio/'
  constructor(private http:HttpClient) {
   }

  loadLocations():Observable<any> {
    return this.http.get(this.url)
  }

  loadLocation(id:string):Observable<any> {
    return this.http.get(this.url+id)
  }

  addLocation(entidad:any):Observable<any>{
    return this.http.post(this.url,entidad)
  }

  updateLocation(id:string, entidad:any):Observable<any>{
    return this.http.put(this.url+id+'/',entidad)
  }

  deleteLocation(id:string):Observable<any> {
    return this.http.delete(this.url+id+'/')
  }

  loadFilterLocationBuildings(id:string):Observable<any>{
    const url_complementaria = 'obtener_laboratorio_bloque/?bloque='
    return this.http.get(this.url+url_complementaria+id)
  }
}
