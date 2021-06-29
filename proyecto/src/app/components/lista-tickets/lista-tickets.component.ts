import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { ServicioUsuarioService } from "../../servicios/servicio-usuario.service";
import { Ticket, estados} from "../../interfaces/ticket"
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
    if(inicio.correo==undefined){
      window.location.href="/";
    }
    this.ruta2=this.ruta.params.subscribe(parametros=>{
      this.idUsuario=parametros["idUsuario"];
    });
    this.servicioUsuario.obtenerUsuario(this.idUsuario).subscribe(datos=>{
      this.usuarioActual=datos[0];
    });
    console.log("usuario1",this.usuarioActual);
    
    this.servicioUsuario.listarTickets().subscribe(datos=>{
      for(let i=0;i<datos.length;i++){
        datos[i].estado=estados[i];
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
