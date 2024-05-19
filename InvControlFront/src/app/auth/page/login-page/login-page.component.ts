import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/dashboard/services/usuario/usuario.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  correoText:string = ''
  passText:string = ''
  errorVisible:boolean = false

  constructor(private router: Router,private entidadUsuario:UsuarioService) {}

  onLogin(): void {
    // Redirige al dashboard
    const usuario = {usu_correo:this.correoText,usu_contrasenia:this.passText}
    this.entidadUsuario.login(usuario).subscribe((respuesta) => {
      localStorage.setItem('rol', respuesta.usu_rol);
      this.router.navigate(['../../dashboard']);   
    }, (error) => {
      this.errorVisible = true
    });

  }

}
