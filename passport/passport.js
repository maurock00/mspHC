var LocaStrategy = require('passport-local').Strategy,
    MspController = require('../controllers/msp-controller') 

module.exports = function(passport){

    passport.serializeUser(function(user, done){
        done(null, user)
    })

    passport.deserializeUser(function(obj, done){
        done(null, obj)
    })

    passport.use(new LocaStrategy({
        passReqToCallback : true
    }, function(req, username, password , done){
        
        var conn = require('../models/msp-connection')

        conn.query('SELECT * FROM user WHERE username = ? ', username, function(err, rows){
            
            if(err){throw err
            } 
            else{
                if(Object.keys(rows).length != 0){
                    var user = rows[1]
    
                    if(rows[0].password == password){
                        return done(null, {
                            id : rows[0].id,
                            username : rows[0].username,
                        })
                    }
                }
    
                return done(null, false)
            }        
        })

        return
    }))
}