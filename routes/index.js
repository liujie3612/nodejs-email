var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.locals.layout = 'layouts/main';
    res.render('index');
});

module.exports = router;