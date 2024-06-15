import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private isAuthenticated: boolean = false;
  private user: any = null;
  private inactivityTimeout: any;
  userstorage: any = null;

  constructor(private router: Router, private usuarioService: UsuarioService) {
    this.checkSession();
  }

  login(usuario: any): Observable<any> {
    return new Observable(observer => {
      this.usuarioService.login(usuario).subscribe(respuesta => {
        this.isAuthenticated = true;
        this.user = respuesta;
        this.userstorage = {
          usu_id: respuesta.usu_id,
          usu_correo: respuesta.usu_correo,
          usu_nombres: respuesta.usu_nombres,
          usu_apellidos: respuesta.usu_apellidos,
          usu_rol: respuesta.usu_rol,
          usu_habilitado: respuesta.usu_habilitado
        };
        localStorage.setItem('user', JSON.stringify(this.userstorage)); // Almacena toda la información del usuario en localStorage
        this.startInactivityTimer();
        observer.next(this.user);
        observer.complete();
      }, error => {
        observer.error(error);
      });
    });
  }

  logout(): void {
    this.isAuthenticated = false;
    this.user = null;
    localStorage.removeItem('user');
    this.clearInactivityTimer();
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUser(): any {
    return this.user;
  }

  getUserRole(): number | string {
    return this.user ? this.user.usu_rol : '';
  }

  private startInactivityTimer() {
    this.clearInactivityTimer();
    this.inactivityTimeout = setTimeout(() => {
      this.logout();
      alert('Sesión expirada por inactividad');
    }, 10 * 60 * 1000); // 10 minutos
  }

  private clearInactivityTimer() {
    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);
    }
  }

  resetInactivityTimer() {
    this.startInactivityTimer();
  }

  private checkSession() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      this.isAuthenticated = true;
      this.startInactivityTimer();
    }
  }
}