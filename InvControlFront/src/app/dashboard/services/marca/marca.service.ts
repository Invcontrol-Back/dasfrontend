import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  url = 'http://127.0.0.1:8000/api/marca/'
  constructor(private http:HttpClient) {
   }

   loadMarcas():Observable<any> {
    return this.http.get(this.url)
  }

  addMarca(entidad:any):Observable<any>{
    return this.http.post(this.url,entidad)
  }

  updateMarca(row:any,entidad:any):Observable<any>{
    return this.http.put(this.url+row+'/',entidad)
  }

  deleteMarca(id:any):Observable<any>{
    return this.http.delete(this.url+id+'/')
  }
}
