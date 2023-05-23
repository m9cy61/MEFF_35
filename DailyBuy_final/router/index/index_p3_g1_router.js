var express = require('express');
var controller = require('../../controller/index/index_p3_g1_controller')
var router = express.Router();

router.get('/', controller);

module.exports = router;