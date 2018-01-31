'use stric';

var MspController = require('../controllers/msp-controller'),
    express = require('express'),
    router = express.Router(),
    passport = require('passport')

router
      .get('/', MspController.showIndex) 
      .get('/buscar', MspController.get )
      .get('/patients', MspController.get)
      .get('/search', MspController.showSearcher)
      .post('/', passport.authenticate('local', {failureRedirect: '/'}), 
        function(req, res) {
            res.redirect('/search')
        }
      )
      .get('/logout', MspController.logout)
      .use(MspController.error404)

module.exports = router;
