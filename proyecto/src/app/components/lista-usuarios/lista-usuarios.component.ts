import { Component, OnInit } from '@angular/core';
import { ServicioUsuarioService } from "../../servicios/servicio-usuario.service";
import {Usuario} from "../../interfaces/usuario";

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  listaUsuarios:Array<Usuario>=[];

  constructor(private servicioUsuario:ServicioUsuarioService) { }

  ngOnInit(): void {
    let inicio=JSON.parse(sessionStorage.getItem("session") || '{}');
    console.log("datos admin",inicio);
    if(inicio.correo==undefined){
      window.location.href="/";
    }
    this.servicioUsuario.listarUsuarios().subscribe(datos=>{
      for(let i=0;i<datos.length;i++){
        this.listaUsuarios.push(datos[i]);
      }
    });
  }

}
