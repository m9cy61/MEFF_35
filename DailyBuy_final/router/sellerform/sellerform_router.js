var express = require('express');
var router = express.Router();
var controller = require('../../controller/sellerform/sellerform_controller');
var multer = require('../../module/multer_setting')
module.exports = {

     sellerform: router.get('/sellerform', controller.sellerform),

     upload: router.post('/upload', multer.multer_for_sellerform, controller.upload),

     // session: router.get('/sellerform/session', controller.session),
}