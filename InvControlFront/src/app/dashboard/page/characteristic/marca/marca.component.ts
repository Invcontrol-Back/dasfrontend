import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MarcaService } from 'src/app/dashboard/services/marca/marca.service';
import { MetaDataColumn } from 'src/app/dashboard/share/interfaces/metacolumn.interface';
import { ModalDeletComponent } from 'src/app/dashboard/share/modal-delet/modal-delet.component';
import { FormMarcaComponent } from './form-marca/form-marca.component';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent {
  mar_id?: string='';
  mar_nombre: string='';
  mar_eliminado: string='';
  idRow: string = '';
  data:any[] =[]
  modalDeleteOpen = false;
  selecMarca: any = {};


  metaDataColumns:MetaDataColumn[] = [
    {field:"mar_id", title:"CÓDIGO"},
    {field:"mar_nombre", title:"MARCA"},
      
  ]

  constructor(private entidadMarca: MarcaService, public dialog: MatDialog) {
    this.loadMarcas();
  }


  loadMarcas() {
    this.entidadMarca.loadMarcas().subscribe(data => {
      this.data = data.map((item:any) => ({
        ...item,
      })
        );
      },error => {
        console.log(error)
      })
  }
  openDeleteModal(marca: any): void {
    const dialogRef = this.dialog.open(ModalDeletComponent, {
      width: '400px',
      data: {
        title: 'Eliminar Marca',
        message: `¿Está seguro de eliminar la marca "${marca.mar_nombre}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteData(marca);
      }
    });
  

  }
  deleteData(marca: any): void {
    this.entidadMarca.deleteMarca(marca.mar_id).subscribe(
      ()=>{
        console.log('Marca eliminada:', marca);
        this.loadMarcas()

      }
    );
    console.log('Marca eliminada:', marca);
  }
  
  openMarcaForm(fila: any = null): void {
    const opciones = {
      panelClass: 'panel-container',
      disableClose: true,
      data: fila
    };
    const referencia: MatDialogRef<FormMarcaComponent> = this.dialog.open(FormMarcaComponent, opciones);

    referencia.afterClosed().subscribe((form) => {
      if (form) {
        if (form.mar_id) {
          this.entidadMarca.updateMarca(form.mar_id, form).subscribe(data => {
            this.loadMarcas();
          }, error => {
            console.log(error);
          });
        } else {
          this.entidadMarca.addMarca(form).subscribe(data => {
            this.loadMarcas();
          }, error => {
            console.log(error);
          });
        }
      }
    });
  }



}
