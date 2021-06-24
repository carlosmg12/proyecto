"use strict";
var express = require("express");
var mysql = require("mysql");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
var configServidor = {
    servidor: "127.0.0.1",
    port: 3001
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
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/crearTicket/:idUsuario', bodyParser.json(), function (req, res) {
    var estado = req.body.estado;
    var prioridad = req.body.prioridad;
    var id = req.params.idUsuario;
    var asunto = req.body.asunto;
    var descripcion = req.body.descripcion;
    var categoria = req.body.categoria;
    connection.query("INSERT INTO tickets(estado,prioridad,idUsuario,asunto,descripcion,categoria)VALUES('" + estado + "','" + prioridad + "','" + id + "','" + asunto + "','" + descripcion + "','" + categoria + "')", function (req1, res1) {
        res.status(201).send(JSON.stringify("Ticket creado"));
    });
});
app.get("/listaTickets", bodyParser.json(), function (req, res) {
    connection.query("SELECT * FROM tickets", function (req1, res1) {
        //res.send(res1);
        res.status(200).send(JSON.stringify(res1));
    });
});
app.get("/obtenerTicketsUsuario/:id", bodyParser.json(), function (req, res) {
    var id = req.params.id;
    connection.query("SELECT * FROM tickets WHERE idUsuario = ?", id, function (req1, res1) {
        //res.send(res1);
        res.status(200).send(JSON.stringify(res1));
    });
});
app.get("/obtenerTicket/:id", bodyParser.json(), function (req, res) {
    var id = req.params.id;
    connection.query("SELECT * FROM tickets WHERE idTicket = ?", id, function (req1, res1) {
        //res.send(res1);
        res.status(200).send(JSON.stringify(res1));
    });
});
app.put('/editarTcket/:id', bodyParser.json(), function (req, res) {
    var id = req.params.id;
    var estado = req.body.estado;
    var prioridad = req.body.prioridad;
    var asunto = req.body.asunto;
    var descripcion = req.body.descripcion;
    var categoria = req.body.categoria;
    var respuesta = req.body.respuesta;
    connection.query("UPDATE tickets SET estado=?,prioridad=?,asunto=?,descripcion=?,categoria=?,respuesta=? WHERE idTicket=?", [estado, prioridad, asunto, descripcion, categoria, respuesta, id], function (req1, res1) {
        res.status(200).send(JSON.stringify("Ticket actualizado"));
    });
});
app.delete("borrarTicket/:id", bodyParser.json(), function (req, res) {
    var id = req.params.id;
    connection.query("DELETE FROM tickets WHERE idTicket = ?", id, function (req1, res1) {
        res.status(200).send(JSON.stringify("Ticket eliminado"));
    });
});
//[estado,prioridad,idUsuario,asunto,descripcion,categoria]
app.post('/crearUsuario', bodyParser.json(), function (req, res) {
    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var rut = req.body.rut;
    var direccion = req.body.direccion;
    var region = req.body.region;
    var comuna = req.body.comuna;
    var correo = req.body.correo;
    var contrasena = req.body.contrasena;
    var rol = req.body.rol;
    connection.query("INSERT INTO usuarios(nombre,apellido,rut,direccion,region,comuna,correo_electronico,contrasena,rol)VALUES('" + nombre + "','" + apellido + "','" + rut + "','" + direccion + "','" + region + "','" + comuna + "','" + correo + "',MD5('" + contrasena + "'),'" + rol + "')", function (req1, res1) {
        res.status(201).send(JSON.stringify("usuario creado de pana mi rey su valorant"));
    });
});
app.get('/login', function (req, res) {
    var correo = req.query.correo;
    var pass = req.query.pass;
    connection.query("SELECT idUsuario,correo_electronico FROM usuarios WHERE correo_electronico = ? AND contrasena=md5(?)", [correo, pass], function (error, res1, fields) {
        //res.send(res1);
        if (error) {
            throw (error);
        }
        else {
            res.status(200).send(JSON.stringify(res1));
        }
    });
});
app.get("/obtenerUsuario/:id", bodyParser.json(), function (req, res) {
    var id = req.params.id;
    connection.query("SELECT * FROM usuarios WHERE idUsuario = ?", id, function (req1, res1) {
        //res.send(res1);
        res.status(200).send(JSON.stringify(res1));
    });
});
app.get("/listaUsuarios", bodyParser.json(), function (req, res) {
    connection.query("SELECT * FROM usuarios", function (req1, res1) {
        res.status(200).send(JSON.stringify(res1));
    });
});
app.put('/editarUsuario/:id', bodyParser.json(), function (req, res) {
    var id = req.params.id;
    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var rut = req.body.rut;
    var direc = req.body.direc;
    var region = req.body.region;
    var comuna = req.body.comuna;
    var correo = req.body.correo;
    var contrasena = req.body.contrasena;
    connection.query("UPDATE usuarios SET nombre=?,apellido=?,rut=?,direccion=?,region=?,comuna=?,correo_electronico=?,contrasena=? WHERE idUsuario=?", [nombre, apellido, rut, direc, region, comuna, correo, contrasena, id], function (req1, res1) {
        res.status(200).send(JSON.stringify("usuario actualizado"));
    });
});
app.delete("borrarUsuario/:id", bodyParser.json(), function (req, res) {
    var id = req.params.id;
    connection.query("DELETE FROM usuarios WHERE idUsuario = ?", id, function (req1, res1) {
        res.status(200).send(JSON.stringify("Usuario eliminado"));
    });
});
app.listen(configServidor, function () {
    console.log("" + configServidor.port);
});
