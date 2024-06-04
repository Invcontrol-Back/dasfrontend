import { Component} from '@angular/core';
import { GeneralService } from '../../services/general/general.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  datoSof:any = []
  datoUsu:any = []
  datoTec:any = []
  datoInm:any = []

  items = [
    { titulo: 'Tecnológicos', disponibles: '0',nodisponibles: '0',icono:"computer" },
    { titulo: 'Inmobiliarios', disponibles: '0',nodisponibles: '0',icono:"chair" },
    { titulo: 'Software', disponibles: '0',nodisponibles: '0',icono:"devices" },
    { titulo: 'Usuario', disponibles: '0',nodisponibles: '0',icono:"person" },
  ];

  datos: { nombre: string, valor: number }[] = [
    { nombre: 'Equipos', valor: 20 },
    { nombre: 'Cámaras', valor: 50 },
    { nombre: 'Proyectores', valor: 30 },
  ];
  escala = 5;

  constructor(private entidadGeneral:GeneralService) { }

  ngOnInit(): void {
    this.datosTecnologico()
    this.datosInmueble()
    this.datosUsuario()
    this.datosSoftware()
  }

  datosTecnologico(){
    this.entidadGeneral.loadDashboardTecnologico().subscribe(data=>{
      this.datoTec = data
      this.actualizarItems()  
    })
  }

  datosInmueble(){
    this.entidadGeneral.loadDashboardInmueble().subscribe(data=>{
      this.datoInm = data
      this.actualizarItems()  
    })
  }

  datosSoftware(){
    this.entidadGeneral.loadDashboardSoftware().subscribe(data=>{
      this.datoSof = data
      this.actualizarItems()  
    })
  }

  datosUsuario(){
    this.entidadGeneral.loadDashboardUsuario().subscribe(data=>{
      this.datoUsu = data    
      this.actualizarItems()  
    })
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
}
