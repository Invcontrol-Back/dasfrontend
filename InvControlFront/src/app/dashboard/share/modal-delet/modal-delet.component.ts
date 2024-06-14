import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-delet',
  templateUrl: './modal-delet.component.html',
  styleUrls: ['./modal-delet.component.css']
})
export class ModalDeletComponent {



  constructor(
    public dialogRef: MatDialogRef<ModalDeletComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
