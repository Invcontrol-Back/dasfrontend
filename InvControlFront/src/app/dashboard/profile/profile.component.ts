import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../services/authservice/authservice.service';
import { ModalDeletComponent } from '../share/modal-delet/modal-delet.component';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from '../services/usuario/usuario.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profileForm!: FormGroup;
  user: any;
  passwordChange: boolean = false;
  private passwordTimeout: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthserviceService,
    private dialog: MatDialog,
    private entidadUsuario: UsuarioService,
  ) {
    this.user = this.authService.getUser();
  }

  ngOnInit(): void {
    if (!this.user) {
      
      this.user = this.authService.getUser();
    }

    this.profileForm = this.fb.group({
      usu_id: [this.user?.usu_id],
      usu_correo: [this.user.usu_correo, [Validators.required, Validators.email]],
      usu_contrasenia: [''],
      confirmPassword: [''],
      usu_cedula: [{ value: this.user.usu_cedula, disabled: true }],
      usu_nombres: [this.user.usu_nombres, Validators.required],
      usu_apellidos: [this.user.usu_apellidos, Validators.required],
      rol_nombre: [{ value: this.user.rol_nombre, disabled: true }]
    });

    this.profileForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.resetPasswordTimeout();
    });
  }

  resetPasswordTimeout(): void {
    clearTimeout(this.passwordTimeout);
    this.passwordTimeout = setTimeout(() => {
      this.checkPasswords();
    }, 3000);
  }

  checkPasswords(): void {
    const pass = this.profileForm.get('usu_contrasenia')?.value;
    const passConfirm = this.profileForm.get('confirmPassword')?.value;
    if (pass && passConfirm && pass !== passConfirm) {
      this.showPasswordMismatchAlert();
    }
  }

  showPasswordMismatchAlert(): void {
    this.dialog.open(ModalDeletComponent, {
      data: {
        title: 'Error',
        message: 'Las contraseñas no coinciden.',
        
      }
    });
  }

  onSave(): void {
    if (this.profileForm.valid) {
      if (this.passwordChange) {
        const pass = this.profileForm.get('newPassword')?.value;
        const passConfirm = this.profileForm.get('confirmPassword')?.value;
        if (pass !== passConfirm) {
          this.showPasswordMismatchAlert();
          return;
        }
      }
      const dialogRef = this.dialog.open(ModalDeletComponent, {
        data: {
          title: 'Confirmación',
          message: '¿Está seguro de que desea guardar los cambios?',

        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const updatedData = this.profileForm.value;
          updatedData.usu_cedula = this.user.usu_cedula;
          updatedData.usu_rol = this.user.usu_rol;
          updatedData.usu_habilitado = this.user.usu_habilitado;
          delete updatedData.confirmPassword; // Eliminar el campo de confirmación de contraseña
           // No enviar el campo de cédula deshabilitado
          delete updatedData.rol_nombre; // No enviar el campo de rol deshabilitado
          this.updateUserData(updatedData);
          
        }
      });
    }
  }


  updateUserData(updatedData: any): void {
 
    this.entidadUsuario.updateUsuario(updatedData.usu_id, updatedData).subscribe(
      () => {
        
        this.authService.getUser();
        this.authService.logout();
      },
      error => {
        console.log('Error al actualizar el usuario:', error);
        console.log(updatedData)  
      }
    );
  }


  onPasswordChange(): void {
    this.passwordChange = true;
    this.profileForm.get('newPassword')?.setValidators([Validators.required]);
    this.profileForm.get('confirmPassword')?.setValidators([Validators.required]);
    this.profileForm.get('newPassword')?.updateValueAndValidity();
    this.profileForm.get('confirmPassword')?.updateValueAndValidity();
  }
}