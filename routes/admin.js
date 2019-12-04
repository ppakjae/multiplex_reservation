var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('adminIndex');
});
router.get('/info', function(req, res, next) {
  res.render('info');
});
router.get('/rewards', function(req, res, next) {
  res.render('rewards');
});
router.get('/salary', function(req, res, next) {
  res.render('salary');
});
router.get('/sales', function(req, res, next) {
  res.render('sales');
});
router.get('/vacation', function(req, res, next) {
  res.render('vacation');
});

module.exports = router;
