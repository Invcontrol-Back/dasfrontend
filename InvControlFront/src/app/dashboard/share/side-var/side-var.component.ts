import { Component } from '@angular/core';
import { MenuItems } from '../models/menu.model';

@Component({
  selector: 'app-side-var',
  templateUrl: './side-var.component.html',
  styleUrls: ['./side-var.component.css']
})
export class SideVarComponent {

  menu: MenuItems[]= [
    {label:'Dashboard', icon: 'data_thresholding', routerLink: './home'},
    
    {label:'Inventario', icon: 'token', routerLink: './inventory',
      items: [{label:'Tecnologico', icon: 'computer', routerLink:'./tech'},
      {label:'Inmobiliario', icon: 'chair', routerLink:'./notech'},
      {label:'Software', icon: 'developer_board', routerLink:'./software'},
      {label:'Componentes', icon: 'devices', routerLink:'./component'}
      ]
    },


    {label:'Usuarios', icon: 'person', routerLink: './user'},
    {label:'Áreas', icon: 'account_tree', routerLink: './user',
    items: [{label:'Bloques', icon: 'computer', routerLink:'./building'},
    {label:'Ubicacion', icon: 'chair', routerLink:'./location'},
    {label:'Etiquetas', icon: 'label', routerLink:'./label'},
    
      ] },
    {label:'Reportes', icon: 'book_5', routerLink: './report'},
    




  ];
}
