export interface Ticket {
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
    idTicket : number;
    Asunto : string;
    categoria : number;
    descripcion : string; 
}
