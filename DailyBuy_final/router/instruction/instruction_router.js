var express = require('express');
var controller = require('../../controller/instruction/instruction_controller')
var router = express.Router();

router.get('/', controller);

module.exports = router;