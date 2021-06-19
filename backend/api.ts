const express = require("express");
const mysql = require("mysql");
const app = express();

const servidor = "127.0.0.1";
const port = 3000;

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

app.get("/",(req:any,res:any)=>{
    res.send("hola mundo");
});

app.get("/tickets",(req:any,res:any)=>{
    connection.query("select * from tickets",(req1:any,res1:any)=>{
        //res.send(res1);
        res.status(200).send(res1);
    });
});

app.get("/tickets/:id",(req:any,res:any)=>{
    let id=req.params.id;
    connection.query("select * from tickets where idTicket = ?",id,(req1:any,res1:any)=>{
        //res.send(res1);
        res.status(200).send(res1);
    });
});


app.listen(port,()=>{
    console.log(`${port}`);
});