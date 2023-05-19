const controller = require('../../controller/wish/wish_controller')
var express = require('express');
var router = express.Router();

module.exports = {

     wish: router.get('/', controller.wish),

     insertwish: router.post('/insertwish', controller.insertwish),

     select: router.get('/select', controller.select),

     wishcount: router.post('/wishcount', controller.wishcount),

     collect: router.get('/collect',controller.collect),

     select1: router.post('/select1', controller.select1),

}