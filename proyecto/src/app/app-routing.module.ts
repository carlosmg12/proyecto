import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListaUsuariosComponent} from "./components/lista-usuarios/lista-usuarios.component";

const routes: Routes = [
  {path:"listausuarios",component:ListaUsuariosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
