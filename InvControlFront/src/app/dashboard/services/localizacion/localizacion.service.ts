import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {

  url = 'http://127.0.0.1:8000/api/localizacion/'
  constructor(private http:HttpClient) {
   }

   loadLocalizaciones():Observable<any> {
    return this.http.get(this.url)
  }

  addLocalizacion(entidad:any):Observable<any>{
    return this.http.post(this.url,entidad)
  }

  updateLocalizacion(row:any,entidad:any):Observable<any>{
    return this.http.put(this.url+row+'/',entidad)
  }

  deleteLocalizacion(id:any):Observable<any>{
    return this.http.delete(this.url+id+'/')
  }
}
