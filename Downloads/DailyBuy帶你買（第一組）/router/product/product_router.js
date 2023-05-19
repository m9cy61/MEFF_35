var express = require('express');
var router = express.Router();
var controller = require('../../controller/product/product_controller');

module.exports = {
     product: router.get('/product', controller.product),

     product_id: router.get('/product/:product_id', controller.product_id),

     user_login: router.get('/userlogin', controller.user_login),

     add_to_favorites: router.post('/add-to-favorites', controller.add_to_favorites),

     remove_from_favorites: router.delete('/remove-to-favorites', controller.remove_from_favorites),

     email: router.post('/product/send-email', controller.email)
}