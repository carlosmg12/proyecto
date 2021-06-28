import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-interfaz-usuario',
  templateUrl: './interfaz-usuario.component.html',
  styleUrls: ['./interfaz-usuario.component.scss']
})
export class InterfazUsuarioComponent implements OnInit {

  ruta2:any;
  idUsuario:number=0;

  constructor(private router:Router,private ruta:ActivatedRoute) { }

  ngOnInit(): void {
    let inicio=JSON.parse(sessionStorage.getItem("session") || '{}');
    console.log("datos admin",inicio);
    if(inicio.correo==undefined){
      window.location.href="/";
    }
    this.ruta2=this.ruta.params.subscribe(parametros=>{
      this.idUsuario=parametros["idUsuario"];
      console.log("id cliente",this.idUsuario)
    });
  }

  misTickets(){
    this.router.navigate([`/mistickets/${this.idUsuario}`]);
  }

  crearTicket(){
    this.router.navigate([`/crearticket/${this.idUsuario}`]);
  }

}
