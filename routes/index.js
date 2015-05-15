var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/books', function(req, res, next) {
  res.render('index', { title: 'MEAN Crud Demo With Bootstrap' });
});

module.exports = router;
