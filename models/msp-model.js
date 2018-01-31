 'use strict';

var conn = require('./msp-connection'),
     MspModel = () => {};

MspModel.getAll = (callback) => {
    conn.query('SELECT Pac_id,Pac_tarjeta,Pac_Nombres,Pac_Apellido1,Pac_Apellido2 \
                FROM msp_pacientes limit 10', 
                callback);
}

MspModel.getOneByCI = (Pac_CI, callback) => {
    conn.query('SELECT * FROM msp_pacientes WHERE Pac_CI = ?', Pac_CI, callback)
}

MspModel.getOneByHC = (Pac_historiaclinica, callback) => {
    conn.query('SELECT * FROM msp_pacientes WHERE Pac_historiaclinica = ?', Pac_historiaclinica, callback)
}

MspModel.getOneByTR = (Pac_tarjeta, callback) => {
    conn.query(`SELECT * FROM msp_pacientes WHERE Pac_tarjeta = ${Pac_tarjeta}`, callback)
}

MspModel.getOneByAP = (Pac_Apellido1, Pac_Apellido2, callback) => {
    conn.query('SELECT * FROM msp_pacientes WHERE Pac_Apellido1 = ? AND Pac_Apellido2 = ?' , [Pac_Apellido1, Pac_Apellido2], callback)
}

MspModel.getOneByNO = (Pac_Nombres, callback) => {
    conn.query('SELECT * FROM msp_pacientes WHERE Pac_Nombres LIKE "%" ? "%" ', Pac_Nombres , callback)
}

MspModel.authUser = (username, password, callback) => {
    conn.query('SELECT * FROM user WHERE username = ? and password = ? ',[username, password], callback)
}

module.exports = MspModel; 