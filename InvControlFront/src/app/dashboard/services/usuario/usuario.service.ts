import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = 'http://127.0.0.1:8000/api/usuario/'
  url_login = 'http://127.0.0.1:8000/api/login/'
  constructor(private http:HttpClient) {
   }

  login(entidad:any):Observable<any>{
    return this.http.post(this.url_login,entidad)
  }
}
