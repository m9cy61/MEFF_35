var express = require('express');
var router = express.Router();
var login_controller = require('../../controller/member/login_controller');

module.exports = {

     login: router.get('/', login_controller.login),

     post: router.post('/', login_controller.post),

     post_encypted: router.post('/', login_controller.post_encypted),

     google: router.post('/google_login', login_controller.google),

     logout: router.post('/logout', login_controller.logout),

}