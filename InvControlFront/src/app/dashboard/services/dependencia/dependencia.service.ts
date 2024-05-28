import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DependenciaService {

  url = 'http://127.0.0.1:8000/api/dependencia/'
  constructor(private http:HttpClient) {
   }

   loadDependencias():Observable<any> {
    return this.http.get(this.url)
  }
}
