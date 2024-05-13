import { Component } from '@angular/core';
import { MenuItems } from '../models/menu.model';

@Component({
  selector: 'app-side-var',
  templateUrl: './side-var.component.html',
  styleUrls: ['./side-var.component.css']
})
export class SideVarComponent {

  menu: MenuItems[]= [
    {label:'Dashboard', icon: 'home', routerLink: './home'},
    {label:'Perfil', icon: 'home', routerLink: './user'}

  ];
}
