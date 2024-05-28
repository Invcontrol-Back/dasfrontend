import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url = 'http://127.0.0.1:8000/api/categoria/'
  constructor(private http:HttpClient) {
   }

   loadCategorias():Observable<any> {
    return this.http.get(this.url)
  }
}
