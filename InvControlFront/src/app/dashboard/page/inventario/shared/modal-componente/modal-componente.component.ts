import { Component, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-componente',
  templateUrl: './modal-componente.component.html',
  styleUrls: ['./modal-componente.component.css']
})
export class ModalComponenteComponent {


  titulo=''
  formulario!:FormGroup

  constructor(private refrencia:MatDialogRef<ModalComponenteComponent>,@Inject(MAT_DIALOG_DATA) public data:any){
   this.titulo=data?'EDICION':'NUEVO'


   
  }
 ngOnInit(): void {
   this.cargarFormulario();
   this.obCambios();
 }
  grabar(){
   const form=this.formulario.getRawValue();
   this.refrencia.close(form)    
 
 
  }

  cargarFormulario(){
   this.formulario= new FormGroup({
    idComponente: new FormControl(this.data?.com_id),
    serieTecnologico : new FormControl (this.data ? this.data.com_serie :'', Validators.required),
    serieComponente : new FormControl (this.data ? this.data.com_codigo_bien :'', Validators.required),
    codigoUta : new FormControl({value: this.data ? this.data.com_codigo_uta:'', disabled: true}, Validators.required),
    nombreComponente : new FormControl (this.data ? this.data.com_det_cat_id:'', Validators. required),
    modeloComponente : new FormControl (this.data ? this.data.com_modelo:'', Validators. required),
    marcaComponente : new FormControl (this.data ? this.data.com_marca:'', Validators. required),
    caracteristicaComponente : new FormControl (this.data ? this.data.com_caracteristica:'', Validators. required),
    departamento_idcomponete : new FormControl (this.data ? this.data.om_dep_id:'', Validators. required),
    anioingreso : new FormControl (this.data ? this.data.com_anio_ingreso:'', Validators. required),
    descripcion : new FormControl (this.data ? this.data.com_eliminado:'', Validators. required),
    disponible : new FormControl (this.data ? this.data.com_eliminado:'', Validators. required),


     

   })
  }

  obCambios() {
    this.formulario.get('serieComponente')!.valueChanges.subscribe(value => {
      if (value) {
        this.formulario.get('codigoUta')!.enable();
      } else {
        this.formulario.get('codigoUta')!.disable();
      }
    });
  }



 

}
