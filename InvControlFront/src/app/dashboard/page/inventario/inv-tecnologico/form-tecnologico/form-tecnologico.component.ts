import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoUbicacionService } from 'src/app/dashboard/services/tipoUbicacion/tipo-ubicacion.service';


@Component({
  selector: 'app-form-tecnologico',
  templateUrl: './form-tecnologico.component.html',
  styleUrls: ['./form-tecnologico.component.css']
})
export class FormTecnologicoComponent {

  titulo=''
  formularioT!:FormGroup
  dataTipoUbicacion:any[] = []
  laboratorioSeleccionado: string = '';
 

  constructor(private refrencia:MatDialogRef<FormTecnologicoComponent>,@Inject(MAT_DIALOG_DATA) public data:any,
private entidadTipoUbicacion: TipoUbicacionService){
   this.titulo=data?'EDICION':'NUEVO'
   this.loadTipoUbicaciones()
  }
 ngOnInit(): void {
   this.cargarFormulario();
 }
  grabar(){
   const form=this.formularioT.getRawValue();
   this.refrencia.close(form)    
 
 
  }

  cargarFormulario(){
   this.formularioT= new FormGroup({
     id: new FormControl(this.data?.tec_id),
     codigoTec:new FormControl(this.data ? this.data.tec_codigo:'', Validators.required),
     serieTec:new FormControl(this.data ? this.data.tec_serie:'', Validators.required),
     modeloTec:new FormControl(this.data ? this.data.tec_modelo:'', Validators.required),
     marcaTec:new FormControl(this.data ? this.data.tec_marca:'', Validators.required),
     ipTec:new FormControl(this.data ? this.data.tec_ip:''),
     anioIngresoTec:new FormControl(this.data ? this.data.tec_anio_ingreso:'', Validators.required),
     tecnicoEncIdTec:new FormControl(this.data ? this.data.tec_encargado_id:'', Validators.required),
     localizacionIdTec:new FormControl(this.data ? this.data.sof_tip_ubi:'', Validators.required),
     categoriaIdTec:new FormControl(this.data ? this.data.tec_cat_id:'', Validators.required),
     dependenciaIdTec:new FormControl(this.data ? this.data.tec_dep_id:'', Validators.required),
     eleminadoTec:new FormControl(this.data ? this.data.tec_eliminado:'', Validators.required),

     

   })
  }
  loadTipoUbicaciones(){
    this.entidadTipoUbicacion.loadTipoUbicaciones().subscribe(data => {
      this.dataTipoUbicacion = data
    },error => {
      console.log(error)
    })
  
  }

}
