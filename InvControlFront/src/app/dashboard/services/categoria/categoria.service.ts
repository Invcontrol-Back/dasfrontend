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

  addCategory(entidad:any):Observable<any> {
    return this.http.post(this.url, entidad)
  }
  updateCategory(id:any, category:any):Observable<any> {
    return this.http.put(this.url+id+'/', category)
  }
  deleteCategory(id:any):Observable<any> {
    return this.http.delete(this.url+id+'/')
  }
  loadCategoriasEspecificas(tipo:any):Observable<any>{
    const url_complementaria = 'recuperar_tipo_categoria/?tipo='
    return this.http.get(this.url+url_complementaria+tipo)
  }
}
