const resetPWD_controller = require('../../controller/member/resetPWD_controller')
var express = require('express');
var router = express.Router();

module.exports = {

     resetPWD: router.get('/resetPWD', resetPWD_controller.resetPWD),

     post: router.post('/resetPWD', resetPWD_controller.post),

}