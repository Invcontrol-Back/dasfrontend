import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Faculty } from '../../share/models/faculty.model';


@Injectable({
  providedIn: 'root'
})
export class FacultadService {

  url = 'http://127.0.0.1:8000/api/facultad/'
  constructor(private http:HttpClient) {
   }

   loadFacultys():Observable<any> {
    console.log(`Esta es la URL: ${this.url}`)
    return this.http.get(this.url)
  }

  loadFaculty(id:string):Observable<any> {
    return this.http.get(this.url+id)
  }

  addFaculty(entidad:Faculty):Observable<any>{
    return this.http.post(this.url,entidad)
  }

  updateFaculty(id:string, entidad:Faculty):Observable<any>{
    return this.http.put(this.url+id,entidad)
  }

  deleteFaculty(id:string):Observable<any> {
    return this.http.delete(this.url+id)
  }
}
