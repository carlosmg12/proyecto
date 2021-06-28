import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Ticket,estados} from "../../interfaces/ticket";
import {ServicioUsuarioService} from "../../servicios/servicio-usuario.service"

@Component({
  selector: 'app-editar-ticket',
  templateUrl: './editar-ticket.component.html',
  styleUrls: ['./editar-ticket.component.scss']
})
export class EditarTicketComponent implements OnInit {

  formulario:FormGroup;
  ruta2:any;
  categoria:any;
  asunto:any;
  estado:any;
  descripcion:any;
  prioridad:any;
  respuesta:any;
  idTicket:number=0;

  constructor(public fb:FormBuilder,private ruta:ActivatedRoute,private servicio:ServicioUsuarioService) {
    console.log("ticket sin editar",this.servicio.ticketEditar[0]);
    this.formulario=this.fb.group({
      categoria:[this.servicio.ticketEditar[0].categoria,[Validators.required]],
      asunto:[this.servicio.ticketEditar[0].asunto,[Validators.required,Validators.maxLength(300)]],
      estado:[this.servicio.ticketEditar[0].estado,[Validators.required]],
      descripcion:[this.servicio.ticketEditar[0].descripcion,[Validators.required,Validators.maxLength(300)]],
      prioridad:[this.servicio.ticketEditar[0].prioridad,[Validators.required]],
      respuesta:["",[Validators.required,Validators.maxLength(500)]],
    });
   }

  ngOnInit(): void {
    let inicio=JSON.parse(sessionStorage.getItem("session") || '{}');
    console.log("datos admin",inicio);
    if(inicio.correo==undefined){
      window.location.href="/";
    }
    this.ruta2=this.ruta.params.subscribe(parametros=>{
      this.idTicket=parametros["idTicket"];
      console.log("idticket justo antes de actualizar",this.idTicket)
    });
    this.categoria=this.formulario.get("categoria") as FormGroup;
    this.asunto=this.formulario.get("asunto") as FormGroup;
    this.estado=this.formulario.get("estado") as FormGroup;
    this.descripcion=this.formulario.get("descripcion") as FormGroup;
    this.prioridad=this.formulario.get("prioridad") as FormGroup;
    this.respuesta=this.formulario.get("respuesta") as FormGroup;
    console.log("prioridad",this.prioridad);
    console.log("estado",this.estado);
  }

  editarTicket(){
    let estadoString=estados[this.estado.value];
    let ticketNuevo:Ticket={idTicket:this.idTicket,categoria:this.categoria.value,asunto:this.asunto.value,estado:estadoString,descripcion:this.descripcion.value,prioridad:this.prioridad.value,idUsuario:this.servicio.ticketEditar[0].idUsuario,respuesta:this.respuesta.value};
    console.log("ticket listo para actualizar",ticketNuevo);
    this.servicio.actualizarTicket(ticketNuevo).subscribe(datos=>{
      console.log(datos);
    });
    
  }
  get inputs(){
    return this.formulario.controls;
  }

}
