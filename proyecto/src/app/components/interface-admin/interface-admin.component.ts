import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-interface-admin',
  templateUrl: './interface-admin.component.html',
  styleUrls: ['./interface-admin.component.scss']
})
export class InterfaceAdminComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    let inicio=JSON.parse(sessionStorage.getItem("session") || '{}');
    if(inicio.correo==undefined){
      window.location.href="/";
    }
  }

  listaTickets(){
    this.router.navigate(["/listatickets"]);
  }
}
