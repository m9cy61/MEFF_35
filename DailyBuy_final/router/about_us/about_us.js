var express = require('express');
var controller = require('../../controller/about_us/about_us_controller')
var router = express.Router();

router.get('/', controller);

module.exports = router;