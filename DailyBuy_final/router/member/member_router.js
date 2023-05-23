const member_controller = require('../../controller/member/member_controller')
var express = require('express');
var router = express.Router();
var multer = require('../../module/multer_setting')
module.exports = {

     member: router.get('/', member_controller.member),

     info: router.post('/info', member_controller.info),

     follower: router.post('/follower', member_controller.follower),

     follower_modal: router.post('/member/follower/modal', member_controller.follower_modal),

     leader: router.post('/leader', member_controller.leader),

     leader_modal: router.post('/member/leader/modal', member_controller.leader_modal),

     leader_update: router.post('/member/leader/update', member_controller.leader_update),

     update: router.post('/upload/update_info', multer.multer_for_update, member_controller.update),

}