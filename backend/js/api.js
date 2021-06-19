"use strict";
var express = require("express");
var mysql = require("mysql");
var app = express();
var servidor = "127.0.0.1";
var port = 3000;
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
app.get("/", function (req, res) {
    res.send("hola mundo");
});
app.get("/tickets", function (req, res) {
    connection.query("select * from tickets", function (req1, res1) {
        //res.send(res1);
        res.status(200).send(res1);
    });
});
app.get("/tickets/:id", function (req, res) {
    var id = req.params.id;
    connection.query("select * from tickets where idTicket = ?", id, function (req1, res1) {
        //res.send(res1);
        res.status(200).send(res1);
    });
});
app.listen(port, function () {
    console.log("" + port);
});
