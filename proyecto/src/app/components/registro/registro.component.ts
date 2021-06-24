import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Usuario} from "../../interfaces/usuario";
import {ServicioUsuarioService} from "../../servicios/servicio-usuario.service"

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  formulario:FormGroup;
  nombre:any;
  apellido:any;
  rut:any;
  direccion:any;
  region:any;
  comuna:any;
  correo:any;
  contrasena:any;

  cities:Array<any> = [];

  countries = [{
    id: 1, name: 'France', cities: ['Paris', 'Marseille', 'Nice']
  },
  {
    id: 2, name: 'Germany', cities: ['Hamburg', 'Berlin', 'Munich']
  },
  {
    id: 3, name: 'Italy', cities: ['Roma', 'Milan', 'Napoli']
  },
  ];

  constructor(public fb:FormBuilder,private servicio:ServicioUsuarioService) {
    this.formulario=this.fb.group({
      nombre:["",[Validators.required,Validators.maxLength(20)]],
      apellido:["",[Validators.required,Validators.maxLength(20)]],
      rut:["",[Validators.required,Validators.maxLength(10)]],
      direccion:["",[Validators.required,Validators.maxLength(100)]],
      region:["",[Validators.required,Validators.maxLength(30)]],
      comuna:["",[Validators.required,Validators.maxLength(20)]],
      correo:["",[Validators.required,Validators.maxLength(100)]],
      contrasena:["",[Validators.required,Validators.maxLength(200)]],
    });
   }

  ngOnInit(): void {
    this.cities = this.countries.filter(x => x.id == 1)[0].cities;
    this.nombre=this.formulario.get("nombre") as FormGroup;
    this.apellido=this.formulario.get("apellido") as FormGroup;
    this.rut=this.formulario.get("rut") as FormGroup;
    this.direccion=this.formulario.get("direccion") as FormGroup;
    this.region=this.formulario.get("region") as FormGroup;
    this.comuna=this.formulario.get("comuna") as FormGroup;
    this.correo=this.formulario.get("correo") as FormGroup;
    this.contrasena=this.formulario.get("contrasena") as FormGroup;
  }

  crearUsuario(){
    console.log("region",this.region);
    let usuarioNuevo:Usuario={idUsuario:0,nombre:this.nombre.value,apellido:this.apellido.value,rut:this.rut.value,direccion:this.direccion.value,region:this.region,comuna:this.comuna.value,correo:this.correo.value,contrasena:this.contrasena.value,rol:"usuarioCliente"};
    console.log("usuario",usuarioNuevo);
    this.servicio.crearUsuario(usuarioNuevo).subscribe(datos=>{
      console.log("datos",datos);
    });
  }

  get inputs(){
      return this.formulario.controls;
  }

  getValue(event: Event) :any{
    return this.onChange( (event.target as HTMLInputElement).value);
  }

  onChange(deviceValue:any):any {
    this.cities = this.countries.filter(x => x.id == deviceValue)[0].cities;
    return this.region=this.countries[deviceValue-1].name;
  }
}
