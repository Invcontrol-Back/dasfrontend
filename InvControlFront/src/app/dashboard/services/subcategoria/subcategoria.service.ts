import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {
  url = 'http://127.0.0.1:8000/api/detalleCategoria/'
  constructor(private http:HttpClient) {
   }

   loadSubCategorias():Observable<any> {
    return this.http.get(this.url)
  }
  addSubCategoria(subcat:any):Observable<any> {
    return this.http.post(this.url, subcat)
  }

  updateSubCategorias(id : any, subcat:any):Observable<any> {
    return this.http.put(this.url+id+'/', subcat)

  }
  deletSubCat(id:any):Observable<any>{
    return this.http.delete(this.url+id+'/')
  }
}
