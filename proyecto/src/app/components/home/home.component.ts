import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Usuario} from "../../interfaces/usuario";
import {ServicioUsuarioService} from "../../servicios/servicio-usuario.service"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  formulario:FormGroup;
  correo:any;
  contrasena:any;
  mensaje:string="";

  constructor(public fb:FormBuilder,private servicio:ServicioUsuarioService) { 
    this.formulario=this.fb.group({
      correo:["",[Validators.required,Validators.maxLength(100)]],
      contrasena:["",[Validators.required,Validators.maxLength(200)]],
    });
  }

  ngOnInit(): void {
    this.correo=this.formulario.get("correo") as FormGroup;
    this.contrasena=this.formulario.get("contrasena") as FormGroup;
    //let datos=JSON.parse(localStorage.getItem("recuerdame"));
    //if(datos && datos.correo){
      //window.location.href="/registro";
    //}
  }
  ingresar(){
    this.servicio.validarLogin(this.correo.value,this.contrasena.value).subscribe(datos=>{
      if(datos.length==0){
        this.mensaje="login no existe";
      }
      else{
        console.log(datos);
        localStorage.setItem('recuerdame',JSON.stringify({"correo":this.correo.value,"idUsuario":datos[0].idUsuario}))
      }
    });
  }
}
