import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/dashboard/services/authservice/authservice.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  correoText: string = '';
  passText: string = '';
  errorVisible: boolean = false;

  constructor(private router: Router, private authService: AuthserviceService) {}

  onLogin(): void {
    const usuario = { usu_correo: this.correoText, usu_contrasenia: this.passText };
    this.authService.login(usuario).subscribe(
      (respuesta) => {
        //console.log(respuesta)
        this.router.navigate(['../../dashboard/home']);
      },
      (error) => {
        this.errorVisible = true;
      }
    );
  }
}
