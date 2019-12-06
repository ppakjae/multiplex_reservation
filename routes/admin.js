var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session');
var AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';
var ec2 = new AWS.EC2();
var dateFormat = require('dateformat');

var connection = mysql.createConnection({
  post: 3306,
  host: "cenema.cpnxmgyidpor.ap-northeast-2.rds.amazonaws.com",
  user: "admin",
  password: "11111111",
  database: 'cenema',
  multipleStatements: true
});

router.use(session({
  secret: 'sid',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}));

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log("/");
  if (req.session.user) {
    res.render('index', {
      logined: req.session.user.logined,
      employee_name: req.session.user.employee_name,
      employee_rank: req.session.user.employee_rank
    });
  } else {
    res.render('adminIndex', {
      logined: false,
      employee_name: " "

    });
  }

});

router.get('/login', function (req, res, next){
  console.log("/login");
  res.render('adminlogin');
})

router.get('/info', function (req, res, next) {
  console.log("info");
  var sql = 'SELECT * FROM employee';
  connection.query(sql, function (error, results, fields) {
    res.render('info', {
      results
    });
  });
});

router.get('/sales', function (req, res, next) {
  console.log("sales");
  var sql = 'SELECT * FROM movie';
  connection.query(sql, function (error, results, fields) {
    res.render('sales', {
      results
    });
  });
});

router.get('/salary', function (req, res, next) {
  console.log("salary");
  res.render('salary');
});

router.get('/rewards', function (req, res, next) {
  console.log("rewards");
  res.render('rewards');
});

router.get('/vacation', function (req, res, next) {
  console.log("vacation");
  res.render('vacation');
});

module.exports = router;

router.post('/', function (req, res) {
  var employee_name = req.body.employee_name;
  var password = req.body.password;

  var sql = 'SELECT * FROM employee WHERE employee_name = ?';
  connection.query(sql, [employee_name], function (error, results, fields) {
    console.log(results);
    if (results.length == 0) {
      res.render('adminIndex');
    } else {
      var db_pwd = results[0].employee_id;

      if (password == db_pwd) {
        console.log("111111");
        req.session.user = {
          logined: true,
          employee_name: results[0].employee_name,
          employee_rank: results[0].employee_rank
        }

        res.render('adminindex', {
            logined: req.session.user.logined,
            employee_name: req.session.user.employee_name,
            employee_rank: req.session.user.employee_rank
        });
        // if (req.session.user.employee_rank == 1) {
        //   console.log("req.seesion.user.employee_rank == 1: ");
        //   res.render('info', {
        //     logined: req.session.user.logined,
        //     employee_name: req.session.user.employee_name,
        //     employee_rank: req.session.user.employee_rank
        //   });
        // } else {
        //   console.log("req.session.user.employee_rank != 1: ");
        //   res.render('salary', {
        //     logined: req.session.user.logined,
        //     employee_name: req.session.user.employee_name,
        //     employee_rank: req.session.user.employee_rank
        //   });
        // }
      }
      else {
        res.render('adminIndex');
      }
    }
  });
});


router.post('/info', function (req, res, next) {
  var employee_name = req.body.employee_name;
  var phone_number = req.body.phone_number;
  var join_date = req.body.join_date;
  var cinema_id = req.body.cinema_id;
  var employee_rank = req.body.employee_rank;
  // console.log(dateFormat(reuslts.join_date, "yyyymm-----dd"));

  var sql = 'INSERT into employee(employee_name, phone_number, cinema_id, employee_rank) VALUES(?,?,?,?)';
  connection.query(sql, [employee_name, phone_number, cinema_id, employee_rank], function (error, results, fields) {
    res.redirect('info');
  })


});