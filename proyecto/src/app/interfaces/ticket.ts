export interface Ticket {
    idTicket : number;
    estado : number; 
    /*-- Estado:0 Cerrado 
                1 En Desarrollo
                2 Abierto
    --*/ 
    prioridad : number;
    /*-- Prioridad: 1 Baja 
                    2 Media
                    3 Alta
    --*/
    idUsuario : number; 
    asunto : string;
    descripcion : string; 
    categoria : number;
    
}
