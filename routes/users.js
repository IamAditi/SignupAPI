var express = require('express')
var jwt = require('express-jwt')

var router = express.Router();
var controller = require('../controlers/users')

var auth = jwt({
    secret: 'MY_SECRET',
    userProperty :'payload'
})

router.post('/signup', controller.userSignup);
router.post('/uploadDp/:userId', auth, controller.updateDp);
router.post('/login', controller.login);

module.exports = router;