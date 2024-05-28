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
}
