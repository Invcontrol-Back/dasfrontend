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

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  login(usuario: any): Observable<any> {

    return new Observable(observer => {
      this.usuarioService.login(usuario).subscribe(respuesta => {
        this.isAuthenticated = true;
        this.user = {
          usu_id: respuesta.usu_id,
          usu_correo: respuesta.usu_correo,
          usu_contrasenia: respuesta.usu_contrasenia,
          usu_cedula: respuesta.usu_cedula,
          usu_nombres: respuesta.usu_nombres,
          usu_apellidos: respuesta.usu_apellidos,
          usu_rol: respuesta.usu_rol,
          usu_habilitado: respuesta.usu_habilitado,
          usu_eliminado: respuesta.usu_eliminado,
          rol_nombre: respuesta.rol_nombre
        };
        this.startInactivityTimer();
        observer.next(this.user);
        observer.complete();
        console.log('dem  1 ')
      }, error => {
        observer.error(error);
      });
    });
  }

  logout(): void {
    this.isAuthenticated = false;
    this.user = null;
    this.clearInactivityTimer();
    this.router.navigate(['/auth/login']);
    console.log('dem   ')
  }

  isLoggedIn(): boolean {
    console.log('logeado');
    return this.isAuthenticated;
  }

  getUser(): any {
    return this.user;
  }

  getUserRole(): string {
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
}
