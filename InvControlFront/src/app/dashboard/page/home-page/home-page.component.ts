import { Component} from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  items = [
    { titulo: 'Tecnológicos', disponibles: '3',nodisponibles: '3',icono:"computer" },
    { titulo: 'Inmobiliarios', disponibles: '4',nodisponibles: '3',icono:"chair" },
    { titulo: 'Software', disponibles: '5',nodisponibles: '3',icono:"devices" },
    { titulo: 'Usuario', disponibles: '6',nodisponibles: '3',icono:"person" },
  ];

  datos: { nombre: string, valor: number }[] = [
    { nombre: 'Equipos', valor: 20 },
    { nombre: 'Cámaras', valor: 50 },
    { nombre: 'Proyectores', valor: 30 },
  ];
  escala = 5;

  constructor() { }

  ngOnInit(): void {
  }

}
