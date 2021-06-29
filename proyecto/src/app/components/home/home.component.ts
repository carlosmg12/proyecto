import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from "@angular/router";
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
  remember:any;

  constructor(public fb:FormBuilder,private servicio:ServicioUsuarioService,private ruta:Router) { 
    this.formulario=this.fb.group({
      correo:["",[Validators.required,Validators.maxLength(100)]],
      contrasena:["",[Validators.required,Validators.maxLength(200)]],
      remember:[""],
      captcha:[],
    });
  }

  ngOnInit(): void {
    this.correo=this.formulario.get("correo") as FormGroup;
    this.contrasena=this.formulario.get("contrasena") as FormGroup;
    this.remember=this.formulario.get("remember") as FormGroup;
    let datos=JSON.parse(localStorage.getItem("recuerdame") || '{}');
    if(datos && datos.correo){
      if(datos.rol=="usuarioCliente"){
        this.ruta.navigate([`/interfazcliente/${datos.idUsuario}`]);
      }
      else{
        this.ruta.navigate([`/interfazadmin/${datos.idUsuario}`]);
      }
    }
  }

  ingresar(){
    
    console.log("remember",this.remember.value);
    this.servicio.validarLogin(this.correo.value,this.contrasena.value).subscribe(datos=>{
      if(datos.length==0){
        this.mensaje="Correo y/o contraseña incorrectos";
      }
      else{
        sessionStorage.setItem('session',JSON.stringify({"correo":datos[0].correo_electronico,"idUsuario":datos[0].idUsuario,"rol":datos[0].rol}));
        if(this.remember.value==true){
          localStorage.setItem('recuerdame',JSON.stringify({"correo":datos[0].correo_electronico,"idUsuario":datos[0].idUsuario,"rol":datos[0].rol}));
        }
      }
      if(datos[0].rol=="usuarioCliente"){
        this.ruta.navigate([`/interfazcliente/${datos[0].idUsuario}`]);
      }
      else{
        this.ruta.navigate([`/interfazadmin/${datos[0].idUsuario}`]);
      }
      
    });
  }

  registro(){
    this.ruta.navigate(['/registro']);
  }
}
