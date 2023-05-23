var express = require('express');
var controller = require('../../controller/agreement/agreement_controller')
var router = express.Router();



module.exports = {

     agreement: router.get('/agreement', controller.agreement),

     add_order: router.post("/add_order", controller.add_order),

};