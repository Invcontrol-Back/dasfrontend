import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ModalcomponenteComponent } from './componentes/modalcomponente/modalcomponente.component';
import { MatTableDataSource } from '@angular/material/table';
import { MetaDataColumn } from '../../share/interfaces/metacolumn.interface';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { RolService } from '../../services/rol/rol.service';
import { InmobiliarioService } from '../../services/inmobiliario/inmobiliario.service';
import { TecnologicoService } from '../../services/tecnologico/tecnologico.service';
import { Inmueble, Tecnologico } from './interfaces/interfaces';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})

export class UserPageComponent {

  data:any[] = []
  metaDataColumns:MetaDataColumn[] = [
    {field:"usu_cedula", title:"CEDULA"},
    {field:"usu_nombres", title:"NOMBRES"},
    {field:"usu_apellidos", title:"APELLIDOS"},
    {field:"usu_correo", title:"CORREO"},
    {field:"usu_habilitado", title:"HABILITADO"},
    {field:"rol_nombre", title:"ROL"}
  ]
  dataRoles:any[] = []
  inmueblesTexto: string = '';
  tecnologicoTexto: string = '';
  inmuebles: Inmueble[] = [];
  tecnologicos: Tecnologico[] = [];

  modalOpen = false;
  modalDeleteOpen = false;
  modalTransferOpen = false;
  selectedUser: any = {};
  titleText = '';
  action = '';
  encargado_actual = '';
  encargado_nuevo = '';
  showButtonCreate = false;
  showButtonEdit = false;

  constructor(private entidadUsuario:UsuarioService,private entidadRol:RolService,private entidadInmueble:InmobiliarioService,
    private entidadTecnologico:TecnologicoService
  ) {
    this.loadUsuarios()
    this.loadRoles()
  }

  loadUsuarios(){
    this.entidadUsuario.loadUsuarios().subscribe(data => {
      this.data = data
    })
  }

  loadRoles(){
    this.entidadRol.loadRoles().subscribe(data =>{
      this.dataRoles = data
    })
  }

  getFilteredUsuarios(): any[] {
    return this.data.filter(usuario => usuario.usu_id !== this.encargado_actual);
  }
  
  ngOnInit(): void {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.entidadUsuario.loadUsuariosCedula(filterValue).subscribe(data=>{
      this.data = data
    })
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
  onKeyDown(event: KeyboardEvent): void {
    // Permitir solo números (0-9) y teclas de control como Enter, Flechas, etc.
    if (!(event.key >= '0' && event.key <= '9') && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'].includes(event.key)) {
      event.preventDefault();
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
  openTransferModal(user: any): void {
    this.encargado_actual = user.usu_id; // Establecer el encargado actual como el encargado actual al abrir el modal
    this.selectedUser = { ...user };

    this.loadBienes(user.usu_id);
    this.modalTransferOpen = true;
  }

  loadBienes(encargadoId: string): void {
    this.entidadInmueble.obtenerInmueblesEncargado(encargadoId).subscribe(
      (response: Inmueble[]) => {
        this.inmuebles = response.map((inmueble: Inmueble) => ({ ...inmueble, selected: false }));
      },
      error => {
        console.error('Error al buscar inmuebles', error);
      }
    );
    this.entidadTecnologico.obtenerTecnologicoEncargado(encargadoId).subscribe(
      (response: Tecnologico[]) => {
        this.tecnologicos = response.map((tecnologico: Tecnologico) => ({ ...tecnologico, selected: false }));
      },
      error => {
        console.error('Error al buscar bienes tecnológicos', error);
      }
    );
  }

  onEncargadoActualChange(event: any): void {
    const newEncargadoId = event.value;
    this.loadBienes(newEncargadoId);
  }

  closeTransferModal(): void {
    this.modalTransferOpen = false;
  }

  actualizarTextoInmuebles() {
    this.inmueblesTexto = this.inmuebles.map(inmueble => `${inmueble.inm_codigo} - ${inmueble.cat_nombre}`).join('\n');
  }
  actualizarTextoTecnologico() {
    this.tecnologicoTexto = this.tecnologicos.map(tecnologico => `${tecnologico.tec_codigo} - ${tecnologico.cat_nombre}`).join('\n');
  }

  saveData(): void {
    this.entidadUsuario.addUsuario(this.selectedUser).subscribe(()=>{
      this.closeModal();
      this.loadUsuarios();      
    })
  }

  updateData(): void {
   
    this.entidadUsuario.updateUsuario(this.selectedUser.usu_id,this.selectedUser).subscribe(()=>{
      this.closeModal();
      this.loadUsuarios();
    })
  }

  deleteData(): void {
    this.entidadUsuario.deleteUsuario(this.selectedUser.usu_id).
    subscribe(()=>{
      this.closeDeleteModal();
      this.loadUsuarios()
    })
  }

  transferData() {
    // Filtrar los inmuebles y tecnológicos seleccionados
    const selectedInmuebles = this.inmuebles.filter(inmueble => inmueble.selected).map(inmueble => inmueble.inm_codigo);
    const selectedTecnologicos = this.tecnologicos.filter(tecnologico => tecnologico.selected).map(tecnologico => tecnologico.tec_codigo);

    // Crear el objeto de datos para la transferencia
    const transferData = {
      encargado_anterior: this.encargado_actual,
      encargado_nuevo: this.encargado_nuevo,
      inmuebles: selectedInmuebles,
      tecnologicos: selectedTecnologicos
    };

    // Llamar al servicio de transferencia de bienes
    this.entidadUsuario.transferirBienesGenerales(transferData).subscribe(
      response => {
        // Cerrar el modal en caso de éxito
        this.closeTransferModal();
      },
      error => {
        // Manejar el error
        console.error('Error al transferir bienes', error);
      }
    );
  }


  toggleSelectAllInmuebles(selectAll: boolean): void {
    this.inmuebles.forEach(inmueble => inmueble.selected = selectAll);
  }
  
  toggleSelectAllTecnologicos(selectAll: boolean): void {
    this.tecnologicos.forEach(tecnologico => tecnologico.selected = selectAll);
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
 
    return this.selectedUser.usu_cedula && this.selectedUser.usu_nombres && this.selectedUser.usu_apellidos 
    && this.selectedUser.usu_habilitado && this.selectedUser.usu_rol && this.selectedUser.usu_correo && this.selectedUser.usu_contrasenia;
  } 

  isValid(): boolean {
    return this.encargado_actual !== '' && this.encargado_nuevo !== '' && (this.inmuebles.some(inmueble => inmueble.selected) || this.tecnologicos.some(tecnologico => tecnologico.selected));
  }
}

