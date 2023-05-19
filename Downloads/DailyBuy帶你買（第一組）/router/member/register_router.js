const register_controller = require('../../controller/member/register_controller.js')
var express = require('express');
var router = express.Router();

module.exports = {

     register: router.get('/', register_controller.register),

     post: router.post('/', register_controller.post),

     post_ecrypted: router.post('/', register_controller.post_ecrypted),
}