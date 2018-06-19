var express = require('express')

var router = express.Router();
var controller = require('../controlers/users')

router.post('/', controller.userSignup);

module.exports = router;