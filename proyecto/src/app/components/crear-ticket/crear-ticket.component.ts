import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Ticket,estados,categorias} from "../../interfaces/ticket";
import {ServicioUsuarioService} from "../../servicios/servicio-usuario.service"

@Component({
  selector: 'app-crear-ticket',
  templateUrl: './crear-ticket.component.html',
  styleUrls: ['./crear-ticket.component.scss']
})
export class CrearTicketComponent implements OnInit {

  formulario:FormGroup;
  ruta2:any;
  categoria:any;
  asunto:any;
  estado:any;
  descripcion:any;
  prioridad:any;
  idUsuario:number=0;

  constructor(public fb:FormBuilder,private ruta:ActivatedRoute,private servicio:ServicioUsuarioService) {
    this.formulario=this.fb.group({
      categoria:["",[Validators.required]],
      asunto:["",[Validators.required,Validators.maxLength(300)]],
      estado:["",[Validators.required]],
      descripcion:["",[Validators.required,Validators.maxLength(300)]],
      prioridad:["",[Validators.required]],
    });
   }

  ngOnInit(): void {
    let inicio=JSON.parse(sessionStorage.getItem("session") || '{}');
    if(inicio.correo==undefined){
      window.location.href="/";
    }
    this.ruta2=this.ruta.params.subscribe(parametros=>{
      this.idUsuario=parametros["idUsuario"];
    });
    this.categoria=this.formulario.get("categoria") as FormGroup;
    this.asunto=this.formulario.get("asunto") as FormGroup;
    //this.estado=this.formulario.get("estado") as FormGroup;
    this.descripcion=this.formulario.get("descripcion") as FormGroup;
    this.prioridad=this.formulario.get("prioridad") as FormGroup;
  }

  crearTicket(){
    let estadoString=estados[this.estado.value];
    let categoriaString=categorias[this.categoria.value];
    let ticketNuevo:Ticket={idTicket:0,categoria:categoriaString,asunto:this.asunto.value,estado:estadoString,descripcion:this.descripcion.value,prioridad:this.prioridad.value,idUsuario:this.idUsuario,respuesta:""};
    this.servicio.crearTicket(ticketNuevo).subscribe(datos=>{
    });
    
  }
  get inputs(){
    return this.formulario.controls;
}
}
