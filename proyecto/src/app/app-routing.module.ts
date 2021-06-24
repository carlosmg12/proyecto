import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListaUsuariosComponent} from "./components/lista-usuarios/lista-usuarios.component";
import {RegistroComponent} from "./components/registro/registro.component";
import {HomeComponent} from "./components/home/home.component";
import {CrearTicketComponent} from "./components/crear-ticket/crear-ticket.component";
import {EditarTicketComponent} from "./components/editar-ticket/editar-ticket.component";
import {ListaTicketsComponent} from "./components/lista-tickets/lista-tickets.component";
import {MisTicketsComponent} from "./components/mis-tickets/mis-tickets.component";
import {InterfaceAdminComponent} from "./components/interface-admin/interface-admin.component";
import {InterfazUsuarioComponent} from "./components/interfaz-usuario/interfaz-usuario.component";


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"registro",component:RegistroComponent},
  {path:"listausuarios",component:ListaUsuariosComponent},
  {path:"crearticket/:idUsuario",component:CrearTicketComponent},
  {path:"editarticket/:idTicket",component:EditarTicketComponent},
  {path:"listatickets/:idUsuario",component:ListaTicketsComponent},
  {path:"mistickets/:idUsuario",component:MisTicketsComponent},
  {path:"interfazadmin",component:InterfaceAdminComponent},
  {path:"interfazcliente",component:InterfazUsuarioComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
