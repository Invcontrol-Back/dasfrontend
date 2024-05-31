import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ModalcomponenteComponent } from './componentes/modalcomponente/modalcomponente.component';
import { MatTableDataSource } from '@angular/material/table';



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
  data = [
    { cedula: '1805873456', usuario: 'juanza9753@uta.edu.ec', nombres: 'Juan Francisco', apellidos: 'Zapata Pauker', rol: 'Técnico', telefono: '123456789', password: 'password', estado: 'Activo' },
    { cedula: '1805873457', usuario: 'ana9753@uta.edu.ec', nombres: 'Ana Maria', apellidos: 'Lopez Perez', rol: 'Administrativo', telefono: '987654321', password: 'password', estado: 'Activo' }
  ];

  filteredData = new MatTableDataSource(this.data);
  displayedColumns: string[] = ['cedula', 'usuario', 'nombres', 'apellidos', 'rol', 'actions'];
  modalOpen = false;
  modalDeleteOpen = false;
  selectedUser: any = {};
  titleText = '';
  action = '';
  showButtonCreate = false;
  showButtonEdit = false;

  constructor() {}

  ngOnInit(): void {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredData.filter = filterValue.trim().toLowerCase();
  }

  openModal(action: string, user: any) {
    this.modalOpen = true;
    this.action = action;
    if (action === 'crear') {
      this.titleText = 'Crear Usuario';
      this.resetSelectedUser();
    } else if (action === 'actualizar') {
      this.titleText = 'Actualizar Usuario';
      this.selectedUser = { ...user };
    }
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  openDeleteModal(user: any): void {
    this.modalDeleteOpen = true;
    this.selectedUser = { ...user };
  }

  closeDeleteModal(): void {
    this.modalDeleteOpen = false;
  }

  saveData(): void {

    this.data.push(this.selectedUser);
    this.closeModal();
  }

  updateData(): void {
   
    const index = this.data.findIndex(user => user.cedula === this.selectedUser.cedula);
    if (index !== -1) {
      this.data[index] = this.selectedUser;
    }
    this.closeModal();
  }

  deleteData(): void {
   
    this.data = this.data.filter(user => user.cedula !== this.selectedUser.cedula);
    this.closeDeleteModal();
  }

   transferirBienes() {
  
  }
  resetSelectedUser() {
    this.selectedUser = {
      cedula: '',
      usuario: '',
      nombres: '',
      apellidos: '',
      telefono: '',
      password: '',
      rol: '',
      estado: ''
    };
  }
  isFormValid(): boolean {
 
    return this.selectedUser.cedula && this.selectedUser.usuario && this.selectedUser.nombres && this.selectedUser.apellidos && this.selectedUser.rol;
  } 
}
