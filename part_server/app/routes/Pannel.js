const express = require('express');
var app = express();

var PannelController = require('../controller/PannelController');

module.exports = function () {
    app.post('/register',PannelController.RegisterPannel);
    app.post('/update:pannel_id',PannelController.UpdatePannel);

    app.get('/info:auth_id',PannelController.infoPannel);

    return app;
}