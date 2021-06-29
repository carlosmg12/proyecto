import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscador'
})
export class BuscadorPipe implements PipeTransform {

  transform(value: any, args: any): any {
    let busqueda=[];
    for(let i=0;i<value.length;i++){
      if(value[i].nombre.indexOf(args)>-1){
        busqueda.push(value[i]);
      }
    }
    console.log("valor",value);
    console.log("arg",args);
    return busqueda;
  }

}
