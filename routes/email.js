var express = require('express');
var router = express.Router();

router.get('/dashbord', function(req, res, next) {
    res.locals.layout = 'layouts/main';
    res.render('email/dashbord', res.locals);
});

module.exports = router;
