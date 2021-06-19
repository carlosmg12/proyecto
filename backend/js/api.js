"use strict";
var express = require("express");
var mysql = require("mysql");
var app = express();
var bodyParser = require("body-parser");
var configServidor = {
    servidor: "127.0.0.1",
    port: 3000
};
var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    port: 3306,
    password: "",
    database: "proyecto"
});
connection.connect(function (error) {
    if (error) {
        console.log("Conexion fallida");
        return;
    }
    console.log("conexion realizada con exito");
});
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", function (req, res) {
    res.send("hola mundo");
});
app.get("/tickets", function (req, res) {
    connection.query("SELECT * FROM tickets", function (req1, res1) {
        //res.send(res1);
        res.status(200).send(res1);
    });
});
app.get("/usuarios", function (req, res) {
    connection.query("SELECT * FROM usuarios", function (req1, res1) {
        //res.send(res1);
        res.status(200).send(res1);
    });
});
app.get("/tickets/:id", function (req, res) {
    var id = req.params.id;
    connection.query("SELECT * FROM tickets WHERE idTicket = ?", id, function (req1, res1) {
        //res.send(res1);
        res.status(200).send(res1);
    });
});
//[estado,prioridad,idUsuario,asunto,descripcion,categoria]
app.post('/crearusuario', function (req, res) {
    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var rut = req.body.rut;
    var direc = req.body.direc;
    var region = req.body.region;
    var comuna = req.body.comuna;
    var correo = req.body.correo;
    var contrasena = req.body.contrasena;
    connection.query("INSERT INTO usuarios(nombre,apellido,rut,direccion,region,comuna,correo_electrico,contrasena)VALUES('" + nombre + "','" + apellido + "','" + rut + "','" + direc + "','" + region + "','" + comuna + "','" + correo + "','" + contrasena + "')", function (req1, res1) {
        res.status(201).send("usuario creado de pana mi rey su valorant");
    });
});
app.put('/editarusuario/:id', function (req, res) {
    var id = req.params.id;
    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var rut = req.body.rut;
    var direc = req.body.direc;
    var region = req.body.region;
    var comuna = req.body.comuna;
    var correo = req.body.correo;
    var contrasena = req.body.contrasena;
    connection.query("UPDATE usuarios SET nombre=?,apellido=?,rut=?,direccion=?,region=?,comuna=?,correo_electrico=?,contrasena=? WHERE idUsuario=?", [nombre, apellido, rut, direc, region, comuna, correo, contrasena, id], function (req1, res1) {
        res.status(200).send("usuario actualizado");
    });
});
app.listen(configServidor, function () {
    console.log("" + configServidor.port);
});
