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

  loadUsuarios():Observable<any> {
    return this.http.get(this.url)
  }

  loadUsuariosCedula(cedula:any):Observable<any>{
    const url_complementaria = 'buscar_por_cedula/?cedula='
    return this.http.get(this.url + url_complementaria + cedula)
  }

  addUsuario(entidad:any):Observable<any>{
    return this.http.post(this.url,entidad)
  }
  updateUsuario(id:any,entidad:any):Observable<any>{
    return this.http.put(this.url+id+'/',entidad)
  }
  deleteUsuario(id:any):Observable<any>{
    return this.http.delete(this.url+id+'/')
  }

  transferirBienesGenerales(encargados:any):Observable<any>{
    const url_complementaria = 'actualizar_bienes_generales/'
    return this.http.patch(this.url+url_complementaria,encargados)
  }
}
