import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ModalcomponenteComponent } from './componentes/modalcomponente/modalcomponente.component';
import { MatTableDataSource } from '@angular/material/table';
import { MetaDataColumn } from '../../share/interfaces/metacolumn.interface';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { RolService } from '../../services/rol/rol.service';
import { InmobiliarioService } from '../../services/inmobiliario/inmobiliario.service';
import { TecnologicoService } from '../../services/tecnologico/tecnologico.service';

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
  inmuebles: any[] = [];
  tecnologicos: any[] = [];

  modalOpen = false;
  modalDeleteOpen = false;
  modalTransferOpen = false;
  selectedUser: any = {};
  titleText = '';
  action = '';
  encargado_objetivo = '';
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

  ngOnInit(): void {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.entidadUsuario.loadUsuariosCedula(filterValue).subscribe(data=>{
      this.data = data
    })
  }
  onKeyDown(event: KeyboardEvent): void {
    // Permitir solo números (0-9) y teclas de control como Enter, Flechas, etc.
    if (!(event.key >= '0' && event.key <= '9') && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'].includes(event.key)) {
      event.preventDefault();
    }
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
  openTransferModal(user:any):void{
    this.entidadInmueble.obtenerInmueblesEncargado(user.usu_id).subscribe(
      response => {
        this.inmuebles = response;
        this.actualizarTextoInmuebles();
      },
      error => {
        console.error('Error al buscar inmuebles', error);
      }
    );
    this.entidadTecnologico.obtenerTecnologicoEncargado(user.usu_id).subscribe(
      response => {
        this.tecnologicos = response;
        this.actualizarTextoTecnologico();
      },
      error => {
        console.error('Error al buscar inmuebles', error);
      }
    );
    this.modalTransferOpen = true;
    this.selectedUser = { ...user };
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
    this.entidadUsuario.deleteUsuario(this.selectedUser.usu_id).subscribe(()=>{
      this.closeDeleteModal();
      this.loadUsuarios()
    })
  }

  transferData() {
    console.log(this.selectedUser)
    const entidad = {encargado_anterior:this.selectedUser.usu_id,encargado_nuevo:this.encargado_objetivo}
    this.entidadUsuario.transferirBienesGenerales(entidad).subscribe(
      response => {
        this.closeTransferModal()
      },
      error => {
        console.error('Error al actualizar bienes', error);
      }
    );
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

  isValid():boolean{
    return this.encargado_objetivo != ''
  }
}
