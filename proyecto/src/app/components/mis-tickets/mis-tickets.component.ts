import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-tickets',
  templateUrl: './mis-tickets.component.html',
  styleUrls: ['./mis-tickets.component.scss']
})
export class MisTicketsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let inicio=JSON.parse(sessionStorage.getItem("session") || '{}');
    console.log("datos admin",inicio);
    if(inicio.correo==undefined){
      window.location.href="/";
    }
  }

}
