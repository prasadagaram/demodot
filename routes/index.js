let router = require('express').Router();

require('./movies').route(router);

module.exports = router;
