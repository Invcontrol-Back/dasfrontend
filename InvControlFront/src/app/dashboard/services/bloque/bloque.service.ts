import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Building } from '../../share/models/bloque.model';

@Injectable({
  providedIn: 'root'
})
export class BloqueService {

  url = 'http://127.0.0.1:8000/api/bloque/'
  constructor(private http:HttpClient) {
   }

   loadBuildings():Observable<any> {
    console.log(`Esta es la URL: ${this.url}`)
    return this.http.get(this.url)
  }

  loadBuilding(id:string):Observable<any> {
    return this.http.get(this.url+id)
  }

  addBuilding(entidad:any):Observable<any>{
    return this.http.post(this.url,entidad)
  }

  updateBuilding(id:string, entidad:any):Observable<any>{
    return this.http.put(this.url+id+'/',entidad)
  }

  deleteBuilding(id:string):Observable<any> {
    return this.http.delete(this.url+id+'/')
  }
}
