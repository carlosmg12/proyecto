export interface Ticket {
    idTicket : number;
    estado : number; 
    prioridad : number;
    idUsuario : number; 
    asunto : string;
    descripcion : string; 
    categoria : string;
    respuesta: string;
}

export let estados = ["Abierto","En desarrollo","Cerrado"];
export let categorias = ["Solicitud genérica","Solicitud de cambio","Incidente","Problema","Solicitud de hardware","Solicitud de software nuevo"];
