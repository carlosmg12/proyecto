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
  //arregion:Array<any>=[];
  comuna:any;
  correo:any;
  contrasena:any; 
    regionSelect : any;
    //comunas : {};  
    /*regiones : [{
      id: 1, name: 'Metropolitana', comunas: ['Santiago','Conchali','Huechuraba']
    },
    {
      id:2, name: 'Valparaiso', comunas: ['Valparaiso','Vina del Mar','Quilpue']
    },
    {
      id:3, name: 'Antofagasta', comunas: ['PilPil','LleoLleo','nosemas']
    },
    ];  */

  constructor(public fb:FormBuilder,private servicio:ServicioUsuarioService) {
    this.formulario=this.fb.group({
      nombre:["",[Validators.required,Validators.maxLength(20)]],
      apellido:["",[Validators.required,Validators.maxLength(20)]],
      rut:["",[Validators.required,Validators.maxLength(10)]],
      direccion:["",[Validators.required,Validators.maxLength(100)]],
      //region:["",[Validators.required,Validators.maxLength(30)]],
      //comuna:["",[Validators.required,Validators.maxLength(20)]],
      correo:["",[Validators.required,Validators.maxLength(100)]],
      contrasena:["",[Validators.required,Validators.maxLength(200)]],
    });
   }

  ngOnInit(): void {
    this.nombre=this.formulario.get("nombre") as FormGroup;
    this.apellido=this.formulario.get("apellido") as FormGroup;
    this.rut=this.formulario.get("rut") as FormGroup;
    this.direccion=this.formulario.get("direccion") as FormGroup;
    //this.region=this.formulario.get("region") as FormGroup;
    this.region="valpo";
    //let region=document.getElementById("region");
    //region?.addEventListener("change",this.llenarSelect);
    //this.comunas=this.regiones.filter(x => x.id == 1)[0].comunas;
    //this.comuna=this.formulario.get("comuna") as FormGroup;
    this.comuna="valpo";
    this.correo=this.formulario.get("correo") as FormGroup;
    this.contrasena=this.formulario.get("contrasena") as FormGroup;
  }

  /*onChange(deviceValue) {
    this.comunas = this.regiones.filter(x => x.id == deviceValue)[0].comunas;
  }*/

  crearUsuario(){
    let usuarioNuevo:Usuario={idUsuario:0,nombre:this.nombre.value,apellido:this.apellido.value,rut:this.rut.value,direccion:this.direccion.value,region:this.region,comuna:this.comuna,correo:this.correo.value,contrasena:this.contrasena.value};
    
    this.servicio.crearUsuario(usuarioNuevo).subscribe(datos=>{
      console.log(datos);
    });
    
  }

  /*llenarSelect(event:any){
    let variable = ["comuna 1", "comuna 2", "comuna 3", "comuna 4"];
    let i; 
    let comuna = document.getElementById("comuna");
    if(event.target.value==1){
        for(i=0;i<variable.length;i++) {
          let option = document.createElement("option");
          option.text = variable[i];
          comuna?.(option);
        }
    }
  }*/
  get inputs(){
      return this.formulario.controls;
  }
}
