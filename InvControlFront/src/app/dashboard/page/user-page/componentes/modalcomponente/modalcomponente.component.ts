import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modalcomponente',
  templateUrl: './modalcomponente.component.html',
  styleUrls: ['./modalcomponente.component.css']
})
export class ModalcomponenteComponent {
  constructor(public dialog: MatDialog) {}
  roles: string[] = ['Tecnico', 'Administrador', 'Usuario'];
  statuses: string[] = ['Activo', 'Inactivo'];
openDialog(): void {
  
  const dialogRef = this.dialog.open(ModalcomponenteComponent, {
    width: '250px',
    data: { /* data que quieras pasar */ }
  })
  
}

}
