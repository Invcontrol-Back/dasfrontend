import { Component } from '@angular/core';
import { MenuItems } from '../models/menu.model';
import { AuthserviceService } from '../../services/authservice/authservice.service';

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
      ]
    },
     
    {label:'Característica', icon: 'rebase_edit', routerLink: './characteristic',
      items: [{label:'Categoria', icon: 'category', routerLink:'./categoria'},
      {label:'SubCategoria', icon: 'segment', routerLink:'./subcategoria'},
      {label:'Marca', icon: 'star_rate_half', routerLink:'./marca'},
 
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

  constructor(private authService: AuthserviceService) {}

  ngOnInit(): void {
    this.filterMenuByRole();
  }

  filterMenuByRole(): void {
    if (!this.authService.isUserHabilitado()) {
      // Si el usuario no está habilitado, redirigir al login
      this.authService.logout();
    } else if (this.authService.isTecnico()) {
      // Filtrar para el técnico
      this.menu = this.menu.filter(item => item.label !== 'Característica' && item.label !== 'Usuarios' && item.label !== 'Áreas');
    } else if (this.authService.isInvitado()) {
      // Filtrar para el invitado
      this.menu = this.menu.filter(item => item.label !== 'Inventario' && item.label !== 'Característica' && item.label !== 'Usuarios' && item.label !== 'Áreas');
    }
    // El administrador no necesita filtro
  }
}
