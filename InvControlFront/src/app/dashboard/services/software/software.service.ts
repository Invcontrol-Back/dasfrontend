import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Software } from '../../share/models/software.model';

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  url = 'http://127.0.0.1:8000/api/software/'
  constructor(private http:HttpClient) {
   }

   loadSoftwares():Observable<any> {
    return this.http.get(this.url)
  }

  loadSoftware(id:string):Observable<any> {
    return this.http.get(this.url+id)
  }

  addSoftware(entidad:any):Observable<any>{
    return this.http.post(this.url,entidad)
  }

  updateSoftware(id:string, entidad:any):Observable<any>{
    return this.http.put(this.url+id+'/',entidad)
  }

  deleteSoftware(id:string):Observable<any> {
    return this.http.delete(this.url+id+'/')
  }
}
