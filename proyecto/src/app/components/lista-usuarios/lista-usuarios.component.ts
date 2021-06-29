import { Component, OnInit } from '@angular/core';
import { ServicioUsuarioService } from "../../servicios/servicio-usuario.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Usuario} from "../../interfaces/usuario";

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  listaUsuarios:Array<Usuario>=[];
  formulario:FormGroup;
  buscar:any="";

  constructor(public fb:FormBuilder,private servicioUsuario:ServicioUsuarioService) { 
    this.formulario=this.fb.group({
      buscar:["",[Validators.maxLength(200)]],
      
    });
  }

  ngOnInit(): void {
    let inicio=JSON.parse(sessionStorage.getItem("session") || '{}');
    if(inicio.correo==undefined){
      window.location.href="/";
    }
    this.servicioUsuario.listarUsuarios().subscribe(datos=>{
      for(let i=0;i<datos.length;i++){
        this.listaUsuarios.push(datos[i]);
      }
    });
    this.buscar=this.formulario.get("buscar") as FormGroup;
  }

  buscador(){
    console.log("buscar",this.buscar.value)
  }

}
