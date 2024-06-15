import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoriaService } from 'src/app/dashboard/services/categoria/categoria.service';
import { GeneralService } from 'src/app/dashboard/services/general/general.service';
import { MetaDataColumn } from 'src/app/dashboard/share/interfaces/metacolumn.interface';
import { ModalDeletComponent } from 'src/app/dashboard/share/modal-delet/modal-delet.component';
import { FormCatComponent } from './form-cat/form-cat.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {
  cat_id?:string='';
  cat_nombre: string = '';
  cat_tipoBien: string = '';
  cat_eliminado: string = '';
  idRow: string = '';
  data:any[] =[]
  modalDeleteOpen = false;
 

  metaDataColumns:MetaDataColumn[] = [
    {field:"cat_nombre", title:"CATEGORIA"},
    {field:"cat_tipoBien", title:"TIPO DE BIEN"},
      
  ]


  constructor(private entidadCategoria:CategoriaService, private dialog:MatDialog, ){
    this.loadCategoria()
   }


  loadCategoria(){
    this.entidadCategoria.loadCategorias().subscribe(data => {
      this.data = data.map((item:any) => ({
        ...item,
        
      }));
      
    },error => {
      console.log(error)
    })
  }

  openDeleteModal(category: any): void {
    const dialogRef = this.dialog.open(ModalDeletComponent, {
      
      data: {
        title: 'Eliminar Categoria',
        message: `¿Está seguro de eliminar la marca "${category.cat_nombre}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteData(category);
      }
    });
 

   
  }

 
  deleteData(category:any): void {
    this.entidadCategoria.deleteCategory(category.cat_id).subscribe(
      ()=>{
       // console.log('Categoria eliminada:', category);
        this.loadCategoria()

      }
    );

    
    
  }

  openCategoryForm(fila: any = null): void {
    const opciones = {
      panelClass: 'panel-container',
      disableClose: true,
      data: fila
    };
    const referencia: MatDialogRef<FormCatComponent> = this.dialog.open(FormCatComponent, opciones);

    referencia.afterClosed().subscribe((form) => {
      if (form) {
        if (form.cat_id) {
          this.entidadCategoria.updateCategory(form.cat_id, form).subscribe(data => {
            this.loadCategoria();
          }, error => {
            console.log(error);
          });
        } else {
          this.entidadCategoria.addCategory(form).subscribe(data => {
            this.loadCategoria();
          }, error => {
            console.log(error);
          });
        }
      }
    });
  }

}
