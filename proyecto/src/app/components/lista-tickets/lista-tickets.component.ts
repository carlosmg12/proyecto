import { Component, OnInit } from '@angular/core';
import { ServicioUsuarioService } from "../../servicios/servicio-usuario.service";
import { Ticket } from "../../interfaces/ticket"
@Component({
  selector: 'app-lista-tickets',
  templateUrl: './lista-tickets.component.html',
  styleUrls: ['./lista-tickets.component.scss']
})
export class ListaTicketsComponent implements OnInit {

  listaTickets:Array<Ticket>=[];

  constructor(private servicioUsuario:ServicioUsuarioService) { }

  ngOnInit(): void {
    this.servicioUsuario.listarTickets().subscribe(datos=>{
      for(let i=0;i<datos.length;i++){
        this.listaTickets.push(datos[i]);
      }
    });
  }

  editarTicket(idTicket:number){
    this.servicioUsuario.obtenerTicket(idTicket);
  }


}
