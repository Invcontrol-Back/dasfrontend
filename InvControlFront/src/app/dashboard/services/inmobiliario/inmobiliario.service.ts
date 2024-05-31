import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InmobiliarioService {

  url = 'http://127.0.0.1:8000/api/Inmobiliario/'
  constructor(private http:HttpClient) {
   }

   loadInmobiliarios():Observable<any> {
    return this.http.get(this.url)
  }

  addInmobiliario(entidad:any):Observable<any>{
    return this.http.post(this.url,entidad)
  }

  updateInmobiliario(row:any,entidad:any):Observable<any>{
    return this.http.put(this.url+row+'/',entidad)
  }

  deleteInmobiliario(id:any):Observable<any>{
    return this.http.delete(this.url+id+'/')
  }
}
