import { Component, OnInit, ChangeDetectorRef,ViewChild } from '@angular/core';
import { GeneralService } from '../../services/general/general.service';
import { Estadistica } from '../../share/models/estadistica,model';
import { BehaviorSubject } from 'rxjs';
import { ApexAxisChartSeries, ApexChart, ApexNonAxisChartSeries, ApexResponsive, ApexXAxis, ChartComponent } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  

  public chartOptions: Partial<ChartOptions>;
  public barChartOptions: Partial<BarChartOptions>;

  datoSof: any = [];
  datoUsu: any = [];
  datoTec: any = [];
  datoInm: any = [];

  private pieChartDataSubject = new BehaviorSubject<Estadistica[]>([]);
  private barChartDataSubject = new BehaviorSubject<Estadistica[]>([]);
  isDataLoaded: boolean = false;

  items = [
    { titulo: 'Tecnológicos', disponibles: '0', nodisponibles: '0', icono: "computer" },
    { titulo: 'Inmobiliarios', disponibles: '0', nodisponibles: '0', icono: "chair" },
    { titulo: 'Software', disponibles: '0', nodisponibles: '0', icono: "devices" },
    { titulo: 'Usuario', disponibles: '0', nodisponibles: '0', icono: "person" },
  ];

  constructor(private entidadGeneral: GeneralService, private cdr: ChangeDetectorRef) {
   
    this.chartOptions = {
      series: [],
      chart: {
        width: 550,
        type: 'pie',
        toolbar: {
          show: false // Ocultar el botón del menú
        }
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    this.barChartOptions = {
      series: [],
      chart: {
        width: 650,
        type: 'bar',
        toolbar: {
          show: false // Ocultar el botón del menú
        }
      },
      xaxis: {
        categories: [],
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  ngOnInit(): void {
    this.datosTecnologico();
    this.datosInmueble();
    this.datosUsuario();
    this.datosSoftware();
    this.loadPieChartData();
    this.loadBarChartData();
  }

  datosTecnologico() {
    this.entidadGeneral.loadDashboardTecnologico().subscribe(data => {
      this.datoTec = data;
      this.actualizarItems();
    });
  }

  datosInmueble() {
    this.entidadGeneral.loadDashboardInmueble().subscribe(data => {
      this.datoInm = data;
      this.actualizarItems();
    });
  }

  datosSoftware() {
    this.entidadGeneral.loadDashboardSoftware().subscribe(data => {
      this.datoSof = data;
      this.actualizarItems();
    });
  }

  datosUsuario() {
    this.entidadGeneral.loadDashboardUsuario().subscribe(data => {
      this.datoUsu = data;
      this.actualizarItems();
    });
  }

  actualizarItems() {
    if (this.datoTec && this.datoInm && this.datoSof && this.datoUsu) {
      this.items = [
        { titulo: 'Tecnológicos', disponibles: this.datoTec.cantidad_activo, nodisponibles: this.datoTec.cantidad_inactivo, icono: "computer" },
        { titulo: 'Inmobiliarios', disponibles: this.datoInm.cantidad_activo, nodisponibles: this.datoInm.cantidad_inactivo, icono: "chair" },
        { titulo: 'Software', disponibles: this.datoSof.cantidad_activo, nodisponibles: this.datoSof.cantidad_inactivo, icono: "devices" },
        { titulo: 'Usuario', disponibles: this.datoUsu.cantidad_activo, nodisponibles: this.datoUsu.cantidad_inactivo, icono: "person" },
      ];
    }
  }

  loadPieChartData() {
    this.entidadGeneral.loadEstTecnologico().subscribe((data: Estadistica[]) => {
      this.pieChartDataSubject.next(data);
      this.cdr.detectChanges(); // Detectar cambios manualmente
    });

    this.pieChartDataSubject.subscribe(data => {
      this.chartOptions.labels = data.map(item => item.categoria);
      this.chartOptions.series = data.map(item => item.cantidad);
      this.cdr.detectChanges(); // Detectar cambios manualmente
    });
  }

  loadBarChartData() {
    this.entidadGeneral.loadEstInmobiliario().subscribe((data: Estadistica[]) => {
      this.barChartDataSubject.next(data);
      this.cdr.detectChanges(); // Detectar cambios manualmente
    });

    this.barChartDataSubject.subscribe(data => {
      this.barChartOptions.xaxis = {
        categories: data.map(item => item.categoria)
      };
      this.barChartOptions.series = [
        {
          name: 'Cantidad',
          data: data.map(item => item.cantidad)
        }
      ];
      this.cdr.detectChanges(); // Detectar cambios manualmente
    });
  }
}
