var express = require('express');
var router = express.Router();
var controller = require('../../controller/payment/payment_controller');

module.exports = {

     payment: router.get('/', controller.payment),

     card: router.get('/card/:pid', controller.card),

     date: router.get('/date/:pid', controller.date),

     success: router.get('/success', controller.success),

     put: router.put('/order_data2', controller.put),
}