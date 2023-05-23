var express = require('express');
var controller = require('../../controller/index/index_p2_controller')
var router = express.Router();

router.get('/:county', controller);

module.exports = router;