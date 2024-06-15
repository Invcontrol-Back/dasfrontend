import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayouthComponent } from '../../dashboard-layouth/dashboard-layouth.component';
import { MarcaComponent } from './marca/marca.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';

const routes: Routes = [
  {path: '', component:DashboardLayouthComponent,
    children: [
      {path: 'categoria', component: CategoriaComponent},
      {path: 'subcategoria', component: SubcategoriaComponent},
      {path: 'marca', component: MarcaComponent},
      {path: '', redirectTo:'categoria', pathMatch:'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacteristicRoutingModule { }
