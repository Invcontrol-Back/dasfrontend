import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-trasferencia',
  templateUrl: './modal-trasferencia.component.html',
  styleUrls: ['./modal-trasferencia.component.css']
})
export class ModalTrasferenciaComponent {
  titulo=''
  formulario!:FormGroup

  constructor(private refrencia:MatDialogRef<ModalTrasferenciaComponent>,@Inject(MAT_DIALOG_DATA) public data:any){
   this.titulo=data?'EDICION':'NUEVO'

  }
  grabar(){
    const form=this.formulario.getRawValue();
    this.refrencia.close(form)    
   }

}
