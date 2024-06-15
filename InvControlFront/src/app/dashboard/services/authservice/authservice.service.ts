import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
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
          usu_habilitado: respuesta.usu_habilitado,
          usu_cedula: respuesta.usu_cedula,
          rol_nombre: respuesta.rol_nombre
        };
        localStorage.setItem('user', JSON.stringify(this.userstorage)); // Almacena userstorage en localStorage
        this.startInactivityTimer();
        console.log(localStorage.getItem('user'))
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
    this.userstorage = null; // Limpia la información del usuario almacenada
    localStorage.removeItem('user');
    this.clearInactivityTimer();
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || this.checkSession();
  }

  getUser(): any {
    return this.userstorage;
  }

  getUserRole(): number | string {
    return this.userstorage ? this.userstorage.usu_rol : '';
  }

  setUser(user: any): void {
    this.user = user;
    this.userstorage = {
      usu_id: user.usu_id,
      usu_correo: user.usu_correo,
      usu_nombres: user.usu_nombres,
      usu_apellidos: user.usu_apellidos,
      usu_rol: user.usu_rol,
      usu_habilitado: user.usu_habilitado,
      usu_cedula: user.usu_cedula,
      rol_nombre: user.rol_nombre
    };
    localStorage.setItem('user', JSON.stringify(this.userstorage));
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

  private checkSession(): boolean {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userstorage = JSON.parse(storedUser);
      this.isAuthenticated = true;
      this.startInactivityTimer();
      return true;
    }
    return false;
  }

  isUserHabilitado(): boolean {
    return this.userstorage && this.userstorage.usu_habilitado === 'ACTIVO';
  }

  isAdmin(): boolean {
    return this.getUserRole() === 1; // Asumiendo que el rol de administrador es 1
  }

  isTecnico(): boolean {
    return this.getUserRole() === 2; // Asumiendo que el rol de técnico es 2
  }

  isInvitado(): boolean {
    return this.getUserRole() === 3; // Asumiendo que el rol de invitado es 3
  }
}
