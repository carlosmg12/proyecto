import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Ticket,estados } from "../../interfaces/ticket";
import {ServicioUsuarioService} from "../../servicios/servicio-usuario.service"

@Component({
  selector: 'app-mis-tickets',
  templateUrl: './mis-tickets.component.html',
  styleUrls: ['./mis-tickets.component.scss']
})
export class MisTicketsComponent implements OnInit {

  ruta2:any;
  idUsuario:number=0;
  listaTickets:Array<Ticket>=[];
  constructor(private ruta:ActivatedRoute,private servicio:ServicioUsuarioService) { }

  ngOnInit(): void {
    let inicio=JSON.parse(sessionStorage.getItem("session") || '{}');
    if(inicio.correo==undefined){
      window.location.href="/";
    }
    this.ruta2=this.ruta.params.subscribe(parametros=>{
      this.idUsuario=parametros["idUsuario"];
    });
    this.servicio.obtenerTicketsUsuario(this.idUsuario).subscribe(datos=>{
      for(let i=0;i<datos.length;i++){
        datos[i].estado=estados[i];
        this.listaTickets.push(datos[i]);
      }
    });
  }

}
