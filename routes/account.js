var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
    res.render('account/login', res.locals);
    console.log(res.locals);
});

module.exports = router;