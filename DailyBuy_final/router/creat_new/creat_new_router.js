var express = require('express');
var router = express.Router();
var controller = require('../../controller/creat_new/creat_new_controller');

module.exports = {

     create_new_order: router.get('/create_new', controller.create_new_order),

     creat_new_form: router.get("/creat_new_form", controller.creat_new_form),

}