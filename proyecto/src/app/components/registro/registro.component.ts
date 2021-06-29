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
    id: 1, name: 'Arica y Parinacota', cities: ['Arica', 'Camarones', 'Putre','General Lagos']
  },
  {
    id: 2, name: 'Tarapaca', cities: ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Camina', 'Colchane', 'Huara', 'Pica']
  },
  {
    id: 3, name: 'Antofagasta', cities: ['Antofagasta', 'Mejillones', 'Sierra Gorda', 'Taltal', 'Calama', 'Ollague', 'San Pedro de Atacama', 'Tocopilla', 'Maria Elena']
  },
  {
    id: 4, name: 'Atacama', cities: ['Copiapo', 'Caldera', 'Tierra Amarilla', 'Chanaral', 'Diego de Almagro', 'Vallenar', 'Alto del Carmen', 'Freirina', 'Huasco']
  },
  {
    id: 5, name: 'Coquimbo', cities: ['La Serena', 'Coquimbo', 'Andacollo', 'La Higuera', 'Paihuano', 'Vicuña', 'Illapel', 'Canela', 'Los Vilos', 'Salamanca', 'Ovalle', 'Combarbalá', 'Monte Patria', 'Punitaqui', 'Río Hurtado']
  },
  {
    id: 6, name: 'Valparaiso', cities: ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"]
  },
  {
    id: 7, name: 'Libertador General Bernardo O\'Higgins', cities: ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"]
  },
  {
    id: 8, name: 'Maule', cities: ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"]
  },
  {
    id: 9, name: 'Bio Bio', cities: ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío", "Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"]
  },
  {
    id: 10, name: 'Araucania', cities: ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"]
  },
  {
    id: 11, name: 'Los Rios', cities: ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"]
  },
  {
    id: 12, name: 'Los Lagos', cities: ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"]
  },
  {
    id: 13, name: 'Aisén del Gral. Carlos Ibáñez del Campo', cities: ["Coihaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O’Higgins", "Tortel", "Chile Chico", "Río Ibáñez"]
  },
  {
    id: 14, name: 'Magallanes y de la Antártica Chilena', cities: ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
  },
  {
    id: 15, name: 'Metropolitana de Santiago', cities: ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Til Til", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"]
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
