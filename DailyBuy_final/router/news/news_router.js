var express = require('express');
var controller = require('../../controller/news/news_controller.js')
var router = express.Router();

router.get('/', controller);

module.exports = router;