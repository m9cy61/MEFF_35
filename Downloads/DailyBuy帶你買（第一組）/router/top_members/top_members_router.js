var express = require('express');
var router = express.Router();
var controller = require('../../controller/top_members/top_members_controller.js');

module.exports = {

     top_members: router.get('/top', controller.top_members),

     cards: router.get('/card', controller.cards),
}