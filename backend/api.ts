const express = require("express");
const mysql = require("mysql");
const app = express();
const bodyParser = require("body-parser");

const configServidor={
    servidor    : "127.0.0.1",
    port        : 3000}

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

app.use(bodyParser.urlencoded({ extended:false }));

app.get("/",(req:any,res:any)=>{
    res.send("hola mundo");
});

app.get("/tickets",(req:any,res:any)=>{
    connection.query("SELECT * FROM tickets",(req1:any,res1:any)=>{
        //res.send(res1);
        res.status(200).send(res1);
    });
});

app.get("/usuarios",(req:any,res:any)=>{
    connection.query("SELECT * FROM usuarios",(req1:any,res1:any)=>{
        //res.send(res1);
        res.status(200).send(res1);
    });
});

app.get("/tickets/:id",(req:any,res:any)=>{
    let id=req.params.id;
    connection.query("SELECT * FROM tickets WHERE idTicket = ?",id,(req1:any,res1:any)=>{
        //res.send(res1);
        res.status(200).send(res1);
    });
});
//[estado,prioridad,idUsuario,asunto,descripcion,categoria]
app.post('/crearusuario',(req:any,res:any)=>{
    let nombre=req.body.nombre;
    let apellido=req.body.apellido;
    let rut=req.body.rut;
    let direc=req.body.direc;
    let region=req.body.region;
    let comuna=req.body.comuna;
    let correo=req.body.correo;
    let contrasena=req.body.contrasena;
    connection.query("INSERT INTO usuarios(nombre,apellido,rut,direccion,region,comuna,correo_electrico,contrasena)VALUES('"+nombre+"','"+apellido+"','"+rut+"','"+direc+"','"+region+"','"+comuna+"','"+correo+"','"+contrasena+"')",(req1:any,res1:any)=>{
        res.status(201).send("usuario creado de pana mi rey su valorant");
    })
});

app.put('/editarusuario/:id',(req:any,res:any)=>{
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
        res.status(200).send("usuario actualizado");
    })
});

app.listen(configServidor,()=>{
    console.log(`${configServidor.port}`);
});