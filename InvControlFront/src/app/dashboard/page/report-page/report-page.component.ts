import { Component } from '@angular/core';
import { MetaDataColumn } from '../../share/interfaces/metacolumn.interface';
import { TipoUbicacionService } from '../../services/tipoUbicacion/tipo-ubicacion.service';
import { SoftwareService } from '../../services/software/software.service';


@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.css'],
  
})
export class ReportPageComponent {

  modalOpen: boolean = false;
  modalDeleteOpen: boolean = false;

  titleText: string = 'GENERAR REPORTES';
  encargadoText: string = '';
  encargadoDisplayText: string = 'Encargado';
  tipoBienSeleccionado: string = '';
  bloqueSeleccionado: string = '';
  laboratorioSeleccionado: string = '';
  idRow: string = '';

  tiposBien: any[] = [
    { id: '1', nombre: 'Tipo 1' },
    { id: '2', nombre: 'Tipo 2' }
  ];

  bloques: any[] = [
    { id: '1', nombre: 'Bloque 1' },
    { id: '2', nombre: 'Bloque 2' }
  ];

  laboratorios: any[] = [
    { id: '1', nombre: 'Laboratorio 1' },
    { id: '2', nombre: 'Laboratorio 2' }
  ];

  data: any[] = [
    { codigo: '663131', generadoPor: 'Kevin Saquinga', fechaGenerado: '14/04/2024' },
    { codigo: '663131', generadoPor: 'Kevin Saquinga', fechaGenerado: '14/04/2024' },
    { codigo: '663131', generadoPor: 'Kevin Saquinga', fechaGenerado: '14/04/2024' }
  ];

  metaDataColumns: MetaDataColumn[] = [
    { field: "codigo", title: "Codigo" },
    { field: "generadoPor", title: "Generado por" },
    { field: "fechaGenerado", title: "Fecha generado" }
  ];

  constructor() {}

  openModal(action: string, row: any) {
    if (action === 'crear') {
      this.titleText = 'GENERAR REPORTES';
      this.encargadoText = '';
      this.tipoBienSeleccionado = '';
      this.bloqueSeleccionado = '';
      this.laboratorioSeleccionado = '';
    } else {
      this.titleText = 'ACTUALIZAR REPORTE';
      this.encargadoText = row.encargado;
      this.tipoBienSeleccionado = row.tipoBien;
      this.bloqueSeleccionado = row.bloque;
      this.laboratorioSeleccionado = row.laboratorio;
      this.idRow = row.codigo;
    }
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  closeDeleteModal() {
    this.modalDeleteOpen = false;
  }

  openDeleteModal(row: any) {
    this.idRow = row.codigo;
    this.modalDeleteOpen = true;
  }

  deleteData() {
    this.data = this.data.filter(item => item.codigo !== this.idRow);
    this.closeDeleteModal();
  }

  generateReport() {
    const report = {
      codigo: 'new-code', // Cambia esto para generar un código único
      generadoPor: this.encargadoText,
      fechaGenerado: new Date().toLocaleDateString(),
    };
    this.data.push(report);
    this.closeModal();
  }

  downloadReport(row: any) {
    // Implementa la lógica para descargar el reporte
    // Por ejemplo, puedes crear un enlace temporal y hacer que el navegador lo descargue
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(row)], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = `reporte_${row.codigo}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  isFormValid(): boolean {
    return this.encargadoText.trim() !== '' && this.tipoBienSeleccionado.trim() !== '' && this.bloqueSeleccionado.trim() !== '' && this.laboratorioSeleccionado.trim() !== '';
  }

}
