import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
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
  ruta2:any;
  idUsuario:number=0;
  usuarioActual:any={};

  constructor(private servicioUsuario:ServicioUsuarioService,private ruta:ActivatedRoute) { }

  ngOnInit(): void {
    let inicio=JSON.parse(sessionStorage.getItem("session") || '{}');
    console.log("datos admin",inicio);
    if(inicio.correo==undefined){
      window.location.href="/";
    }
    this.ruta2=this.ruta.params.subscribe(parametros=>{
      this.idUsuario=parametros["idUsuario"];
      console.log("idUsuario de esta pagina",this.idUsuario)
    });
    this.servicioUsuario.obtenerUsuario(this.idUsuario).subscribe(datos=>{
      console.log("datos",datos[0]);
      this.usuarioActual=datos[0];
      console.log("usuario",this.usuarioActual);
    });
    console.log("usuario1",this.usuarioActual);
    
    this.servicioUsuario.listarTickets().subscribe(datos=>{
      for(let i=0;i<datos.length;i++){
        this.listaTickets.push(datos[i]);
      }
    });
    console.log("lista",this.listaTickets);
  }


  editarTicket(idTicket:number,numero:number){
    this.servicioUsuario.obtenerTicket(idTicket).subscribe(datos=>{
      this.servicioUsuario.ticket(datos);
    }); 
    this.opcionEditar=numero;
    this.idBoton=idTicket;
  }


}
