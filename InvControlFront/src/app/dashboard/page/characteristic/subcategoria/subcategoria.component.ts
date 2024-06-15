import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SubcategoriaService } from 'src/app/dashboard/services/subcategoria/subcategoria.service';
import { MetaDataColumn } from 'src/app/dashboard/share/interfaces/metacolumn.interface';
import { ModalDeletComponent } from 'src/app/dashboard/share/modal-delet/modal-delet.component';
import { FormSubcatComponent } from './form-subcat/form-subcat.component';

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css']
})
export class SubcategoriaComponent {
  det_cat_id?: string='';
  det_cat_nombre:string='';
  det_cat_eliminado:string='';
  cat_nombre: string='';
  det_cat_cat:string='';

  data:any[] =[]
  modalDeleteOpen = false;
  selecSubCategory: any = {};

  metaDataColumns:MetaDataColumn[] = [
    {field:"det_cat_id", title:"CÓDIGO"},
    {field:"det_cat_nombre", title:"NOMBRE"},
    {field:"cat_nombre", title:"CATEGORÍA"},
      
  ]

  constructor(private entidadSubCategoria:SubcategoriaService, private dialog:MatDialog){
    this.loadSubategoria()
   }

   
  loadSubategoria() {
    this.entidadSubCategoria.loadSubCategorias().subscribe(data => {
      this.data = data.map((item:any) => ({
        ...item,
        
      }));
      
    },error => {
      console.log(error)
    })
  }

  openDeleteModal(subcategory: any): void {
    const dialogRef = this.dialog.open(ModalDeletComponent, {
      
      data: {
        title: 'Eliminar Subcategorias',
        message: `¿Está seguro de eliminar la subcategoria "${subcategory.det_cat_nombre}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteData(subcategory);
      }
    });
  

  }
  deleteData(subcategory: any): void {
    // Lógica para eliminar el dato
    this.entidadSubCategoria.deletSubCat(subcategory.det_cat_id).subscribe(
      ()=>{
        console.log('Sub Categoria eliminada:', subcategory);
        this.loadSubategoria()

      }
    );
    console.log('Marca eliminada:', subcategory);
  }

  openSubcatForm(fila: any = null): void {
    const opciones = {
      panelClass: 'panel-container',
      disableClose: true,
      data: fila
    };
    const referencia: MatDialogRef<FormSubcatComponent> = this.dialog.open(FormSubcatComponent, opciones);

    referencia.afterClosed().subscribe((form) => {
      if (form) {
        if (form.det_cat_id) {
          this.entidadSubCategoria.updateSubCategorias(form.det_cat_id, form).subscribe(data => {
            this.loadSubategoria();
          }, error => {
            console.log(error);
          });
        } else {
          this.entidadSubCategoria.addSubCategoria(form).subscribe(data => {
            this.loadSubategoria();
          }, error => {
            console.log(error);
          });
        }
      }
    });
  }





}
