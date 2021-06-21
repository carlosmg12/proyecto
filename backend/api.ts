const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

const configServidor={
    servidor    : "127.0.0.1",
    port        : 3000
}

let connection = mysql.createConnection({
    host        : "127.0.0.1",
    user        : "root",
    port        : 3306,
    password    : "",
    database    : "proyecto"
});

connection.connect((error:any)=>{
    if (error){
        console.log("Conexion fallida");
        return;
    }
    console.log("conexion realizada con exito");
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended:false }));

app.post('/crearTicket/:idUsuario',bodyParser.json(),(req:any,res:any)=>{
    let estado=req.body.estado;
    let prioridad=req.body.prioridad;
    let id=req.params.idUsuario;
    let asunto=req.body.asunto;
    let descripcion=req.body.descripcion;
    let categoria=req.body.categoria;
    connection.query("INSERT INTO tickets(estado,prioridad,idUsuario,asunto,descripcion,categoria)VALUES('"+estado+"','"+prioridad+"','"+id+"','"+asunto+"','"+descripcion+"','"+categoria+"')",(req1:any,res1:any)=>{
        res.status(201).send(JSON.stringify("Ticket creado"));
    })
});

app.get("/listaTickets",bodyParser.json(),(req:any,res:any)=>{
    connection.query("SELECT * FROM tickets",(req1:any,res1:any)=>{
        //res.send(res1);
        res.status(200).send(JSON.stringify(res1));
    });
});

app.get("/obtenerTicket/:id",bodyParser.json(),(req:any,res:any)=>{
    console.log("si entra");
    let id=req.params.id;
    console.log("idTicket en api",id);
    connection.query("SELECT * FROM tickets WHERE idTicket = ?",id,(req1:any,res1:any)=>{
        //res.send(res1);
        res.status(200).send(JSON.stringify(res1));
    });
});

app.put('/editarTcket/:id',bodyParser.json(),(req:any,res:any)=>{
    let id=req.params.id;
    let estado=req.body.estado;
    let prioridad=req.body.prioridad;
    let asunto=req.body.asunto;
    let descripcion=req.body.descripcion;
    let categoria=req.body.categoria;
    let respuesta=req.body.respuesta;
    connection.query("UPDATE tickets SET estado=?,prioridad=?,asunto=?,descripcion=?,categoria=?,respuesta=? WHERE idTicket=?",[estado,prioridad,asunto,descripcion,categoria,respuesta,id],(req1:any,res1:any)=>{
        res.status(200).send(JSON.stringify("Ticket actualizado"));
    })
});

app.delete("borrarTicket/:id",bodyParser.json(),(req:any,res:any)=>{
    let id=req.params.id;
    connection.query("DELETE FROM tickets WHERE idTicket = ?",id,(req1:any,res1:any)=>{
        res.status(200).send(JSON.stringify("Ticket eliminado"));
    })
});

//[estado,prioridad,idUsuario,asunto,descripcion,categoria]
app.post('/crearUsuario',bodyParser.json(),(req:any,res:any)=>{
    let nombre=req.body.nombre;
    let apellido=req.body.apellido;
    let rut=req.body.rut;
    let direccion=req.body.direccion;
    let region=req.body.region;
    let comuna=req.body.comuna;
    let correo=req.body.correo;
    let contrasena=req.body.contrasena;
    connection.query("INSERT INTO usuarios(nombre,apellido,rut,direccion,region,comuna,correo_electrico,contrasena)VALUES('"+nombre+"','"+apellido+"','"+rut+"','"+direccion+"','"+region+"','"+comuna+"','"+correo+"','"+contrasena+"')",(req1:any,res1:any)=>{
        res.status(201).send(JSON.stringify("usuario creado de pana mi rey su valorant"));
    })
});

app.get("/listaUsuarios",bodyParser.json(),(req:any,res:any)=>{
    connection.query("SELECT * FROM usuarios",(req1:any,res1:any)=>{
        res.status(200).send(JSON.stringify(res1));
    });
});

app.put('/editarUsuario/:id',bodyParser.json(),(req:any,res:any)=>{
    let id=req.params.id;
    let nombre=req.body.nombre;
    let apellido=req.body.apellido;
    let rut=req.body.rut;
    let direc=req.body.direc;
    let region=req.body.region;
    let comuna=req.body.comuna;
    let correo=req.body.correo;
    let contrasena=req.body.contrasena;
    connection.query("UPDATE usuarios SET nombre=?,apellido=?,rut=?,direccion=?,region=?,comuna=?,correo_electrico=?,contrasena=? WHERE idUsuario=?",[nombre,apellido,rut,direc,region,comuna,correo,contrasena,id],(req1:any,res1:any)=>{
        res.status(200).send(JSON.stringify("usuario actualizado"));
    })
});

app.delete("borrarUsuario/:id",bodyParser.json(),(req:any,res:any)=>{
    let id=req.params.id;
    connection.query("DELETE FROM usuarios WHERE idUsuario = ?",id,(req1:any,res1:any)=>{
        res.status(200).send(JSON.stringify("Usuario eliminado"));
    })
});

app.listen(configServidor,()=>{
    console.log(`${configServidor.port}`);
});