import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Usuario } from "../interfaces/usuario";
import { Ticket } from "../interfaces/ticket";

const httpOptions={
  headers: new HttpHeaders({"Content-Type":"application/json"})
};

@Injectable({
  providedIn: 'root'
})
export class ServicioUsuarioService {

  ticketEditar:any;

  servidor="http://127.0.0.1:3001";

  constructor(private servicio:HttpClient) { }

  validarLogin(correo:string,pass:string):Observable<any>{
    let headers=new HttpHeaders();
    headers.append("Content-Type","application/json");
    const params=new HttpParams();
    params.set("correo",correo);
    params.set("pass",pass);
    return this.servicio.get(`${this.servidor}/login?correo=${correo}&pass=${pass}`);
  }

  listarUsuarios():Observable<any>{
    return this.servicio.get(`${this.servidor}/listaUsuarios`);
  }

  listarTickets():Observable<any>{
    return this.servicio.get(`${this.servidor}/listaTickets`);
  }

  obtenerTicket(idTicket:number):Observable<any>{
    return this.servicio.get(`${this.servidor}/obtenerTicket/${idTicket}`);
  }

  obtenerUsuario(idUsuario:number):Observable<any>{
    return this.servicio.get(`${this.servidor}/obtenerUsuario/${idUsuario}`);
  }

  ticket(ticket:Ticket){
    this.ticketEditar=ticket;
  }

  crearUsuario(usuario:Usuario):Observable<any>{
    console.log("usuarioServicio",usuario);
    return this.servicio.post(`${this.servidor}/crearUsuario`,JSON.stringify(usuario),httpOptions);
  }

  crearTicket(ticket:Ticket):Observable<any>{
    console.log(`${this.servidor}/crearTicket/:${ticket.idUsuario}`);
    return this.servicio.post(`${this.servidor}/crearTicket/:${ticket.idUsuario}`,JSON.stringify(ticket),httpOptions);
  }

  actualizarTicket(ticket:Ticket):Observable<any>{
    return this.servicio.put(`${this.servidor}/editarTcket/${ticket.idTicket}`,JSON.stringify(ticket),httpOptions);
  }

}
