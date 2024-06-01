import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  url = 'http://127.0.0.1:8000/api/rol/'
  constructor(private http:HttpClient) {
   }

  loadRoles():Observable<any> {
    return this.http.get(this.url)
  }

}
