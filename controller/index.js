const controller = {};

controller.user = require('./user.controller'); // deklarasi controller user
controller.item = require('./item.controller')
module.exports = controller;