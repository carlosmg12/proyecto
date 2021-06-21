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
  ticketEditar:any;
  opcionEditar:number=0;
  idBoton:number=0;

  constructor(private servicioUsuario:ServicioUsuarioService) { }

  ngOnInit(): void {
    this.servicioUsuario.listarTickets().subscribe(datos=>{
      for(let i=0;i<datos.length;i++){
        this.listaTickets.push(datos[i]);
      }
    });
  }


  editarTicket(idTicket:number,numero:number){
    this.servicioUsuario.obtenerTicket(idTicket).subscribe(datos=>{
      this.servicioUsuario.ticket(datos);
    }); 
    this.opcionEditar=numero;
    this.idBoton=idTicket;
  }


}
