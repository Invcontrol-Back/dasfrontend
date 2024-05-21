import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ModalcomponenteComponent } from './componentes/modalcomponente/modalcomponente.component';



interface Usuario {
  cedula: string;
  usuario: string;
  nombres: string;
  apellidos: string;
  rol: string;
}
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})

export class UserPageComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalcomponenteComponent, {
    });

   
  }
  displayedColumns: string[] = ['cedula', 'usuario', 'nombres', 'apellidos', 'rol', 'acciones'];
  usuarios: Usuario[] = [
    {cedula: '1805873456', usuario: 'juanza9753@uta.edu.ec', nombres: 'Juan Francisco', apellidos: 'Zapata Pauker', rol: 'Tecnico'},
    {cedula: '1805873456', usuario: 'juanza9753@uta.edu.ec', nombres: 'Juan Francisco', apellidos: 'Zapata Pauker', rol: 'Tecnico'},
    {cedula: '1805873456', usuario: 'juanza9753@uta.edu.ec', nombres: 'Juan Francisco', apellidos: 'Zapata Pauker', rol: 'Tecnico'},
    {cedula: '1805873456', usuario: 'juanza9753@uta.edu.ec', nombres: 'Juan Francisco', apellidos: 'Zapata Pauker', rol: 'Tecnico'}
  ];
  roles: string[] = ['Tecnico', 'Administrador', 'Usuario'];
  statuses: string[] = ['Activo', 'Inactivo'];

  
}
