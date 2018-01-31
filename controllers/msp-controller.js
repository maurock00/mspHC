'use strict';

var MspModel = require('../models/msp-model.js'),
    MspController = () => {};

MspController.showIndex = (req, res, next) => {
    if (req.isAuthenticated()){
        res.redirect('/search')
    }
    else{
        res.render('index')   
    }   
}

MspController.showSearcher = (req, res, next) => {
    res.render('search',{
        isAuthenticated : req.isAuthenticated(),
        user : req.user
    })
}

MspController.logout = (req, res, next) => {
    req.logout()
    res.redirect('/')
}

MspController.get = (req, res, next) => {

    function getAge(birthDate){
        var year = birthDate.getFullYear(),
            month = birthDate.getMonth()+1,
            day = birthDate.getDate(),
            currenDate = new Date(),
            currentYear = currenDate.getFullYear(),
            currentMonth = currenDate.getMonth()+1,
            currentDay = currenDate.getDate(),
            years = currentYear - year,
            months = currentMonth - month,
            days = currentDay - day

        if (days < 0){
            days = currentDay
        }    
        else if(months < 0){
            months = currentMonth
            days = currentDay
            years = years -1
        }
        else if (months < 0 && days< 0)
        {
            months = currentMonth
            days = currentDay
            years = years -1
        }
            
        return `${years} años, ${months} meses, ${days} días`
       
    }

    if(req.query.focus == "CI"){

        var Pac_CI = req.query.Pac_CI; 

        if(Pac_CI == ''){
            res.redirect('search')
        }
        else{
            MspModel.getOneByCI( Pac_CI, (err, rows) => {
                if(err){
                    let locals = {
                        title : 'Error al consultar la base de datos',
                        description : 'Error de Sintaxis SQL',
                        error : err
                    }

                    res.render('error', locals)

                } else {

                    if(Object.keys(rows).length == 0)
                    {
                        res.render('registro-no-encontrado',{
                            isAuthenticated : req.isAuthenticated(),
                            user : req.user
                        });
                    }
                    else {
                        let locals = {
                            title : 'Datos del paciente',
                            data: rows,
                            age : getAge(rows[0].Pac_fechanacimiento),
                            isAuthenticated : req.isAuthenticated(),
                            user : req.user
                        };

                        res.render('muestra-datos', locals);
                    }
                }
            })
        }  
    }

    else if(req.query.focus == "HC"){
        
        var Pac_historiaclinica = req.query.Pac_historiaclinica; 
        MspModel.getOneByHC( Pac_historiaclinica, (err, rows) => {
            if(err){
                let locals = {
                    title : 'Error al consultar la base de datos',
                    description : 'Error de Sintaxis SQL',
                    error : err
                }
        
                res.render('error', locals)
        
            } else {
        
                if(Object.keys(rows).length == 0)
                {
                   res.render('registro-no-encontrado',{
                    isAuthenticated : req.isAuthenticated(),
                    user : req.user
                });
                }
                else {
                    let locals = {
                        title : 'Datos del paciente',
                        data: rows,
                        age : getAge(rows[0].Pac_fechanacimiento),
                        isAuthenticated : req.isAuthenticated(),
                        user : req.user
                    };
                    res.render('muestra-datos', locals)
                    
                }
            }
        })
                    
    }

    else if(req.query.focus == "TR"){
        
        var Pac_tarjeta = req.query.Pac_tarjeta; 
        MspModel.getOneByHC( Pac_tarjeta, (err, rows) => {
            if(err){
                let locals = {
                    title : 'Error al consultar la base de datos',
                    description : 'Error de Sintaxis SQL',
                    error : err
                }
        
                res.render('error', locals)
        
            } else {
        
                if(Object.keys(rows).length == 0)
                {
                     res.render('registro-no-encontrado',{
                        isAuthenticated : req.isAuthenticated(),
                        user : req.user
                    });
                }
                else {
                    let locals = {
                        title : 'Datos del paciente',
                        data: rows,
                        age : getAge(rows[0].Pac_fechanacimiento),
                        isAuthenticated : req.isAuthenticated(),
                        user : req.user
                    };
                    res.render('muestra-datos', locals);
                }
            }
        })
                    
    }
    else if(req.query.focus == "AP"){
        
        var Pac_Apellidos = req.query.Pac_Apellidos.split(" "),
            Pac_Apellido1 = ""+Pac_Apellidos[0],
            Pac_Apellido2 = ""+Pac_Apellidos[1]

        MspModel.getOneByAP( Pac_Apellido1, Pac_Apellido2, (err, rows) => {
            if(err){
                let locals = {
                    title : 'Error al consultar la base de datos',
                    description : 'Error de Sintaxis SQL',
                    error : err
                }
        
                res.render('error', locals)
        
            } else {
                
                if(Object.keys(rows).length == 0)
                {
                    res.render('registro-no-encontrado',{
                        isAuthenticated : req.isAuthenticated(),
                        user : req.user
                    });
                }
                else {
                    let locals = {
                        title : 'Datos del paciente',
                        data: rows,
                        isAuthenticated : req.isAuthenticated(),
                        user : req.user
                    };
                    res.render('patients-list', locals);
                }
            }
        })
                    
    }
    else if(req.query.focus == "NO"){
        
        var Pac_Nombres = req.query.Pac_Nombres

        MspModel.getOneByNO( Pac_Nombres, (err, rows) => {
            if(err){
                let locals = {
                    title : 'Error al consultar la base de datos',
                    description : 'Error de Sintaxis SQL',
                    error : err
                }
        
                res.render('error', locals)
        
            } else {
        
                if(Object.keys(rows).length == 0)
                {
                                res.render('registro-no-encontrado',{
                                    isAuthenticated : req.isAuthenticated(),
                                    user : req.user
                                });
                }
                else {
                    let locals = {
                        title : 'Datos del paciente',
                        data: rows,
                        isAuthenticated : req.isAuthenticated(),
                        user : req.user
                    };
                    res.render('patients-list', locals);
                }
            }
        })
                    
    }
}

MspController.error404 = (req, res, next) => {
    let error = new Error(),
    locals = {
      title : 'Error 404',
      description : 'Recurso no encontrado',
      error : error
    }

    error.status = 404;
    res.render('error',locals)

    next();
}

module.exports = MspController;