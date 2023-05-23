var express = require('express');
var controller = require('../../controller/all_product/all_product_controller')
var router = express.Router();



module.exports = {

     all_product: router.get('/', controller.all_product),

     search: router.get('/search/:search', controller.search),

     cards: router.get('/cards', controller.card),

     favorites: router.get('/favorites', controller.favorites),

     history: router.get('/history/:id', controller.history),
};