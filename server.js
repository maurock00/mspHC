'use strict';

var app = require('./app.js'),
    server = app.listen(app.get('port'),'0.0.0.0', () => {
      console.log(`Server en 0.0.0.0:${app.get('port')}`)
    });
