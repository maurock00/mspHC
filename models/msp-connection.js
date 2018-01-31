//Conexion a base de datos
//Esta vez no se usa   myConnection = require('express-myconnection'), ya no es un middleware
'use strict';

var mysql = require('mysql'),
    conf = require('./db-conf.json'), //Los archivos JSON los puedo tratar como modulos
    dbOptions = {
        host : conf.mysql.host,
        port : conf.mysql.port,
        user : conf.mysql.user,
        password : conf.mysql.pass,
        database : conf.mysql.db
    },

myConn = mysql.createConnection(dbOptions);

myConn.connect( (err) => {
    return (err) ? console.log(`Error al Conectarste a MySQL: ${err.stack}`) : 
                   console.log(`Conexion etablecida con MySQL no. ${myConn.threadId}`); 
})

module.exports = myConn;