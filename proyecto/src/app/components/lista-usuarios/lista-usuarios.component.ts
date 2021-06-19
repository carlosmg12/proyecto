import { Component, OnInit } from '@angular/core';
import { ServicioUsuarioService } from "../../servicios/servicio-usuario.service"

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  constructor(private servicioUsuario:ServicioUsuarioService) { }

  ngOnInit(): void {
    this.servicioUsuario.listarUsuarios().subscribe(datos=>{
      console.log(datos);
    })
  }

}
