var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session');
var AWS = require('aws-sdk');
AWS.config.region= 'ap-northeast-2';
var ec2 = new AWS.EC2()

var connection = mysql.createConnection({
    post:3306,
    host:"cenema.cpnxmgyidpor.ap-northeast-2.rds.amazonaws.com",
    user : "admin",
    password:"11111111",
    database: 'cenema',
    multipleStatements: true
});

var login = {
    logined : false,
    username : ""
}


// var connection = mysql.createConnection({
//     multipleStatements: true,
//     host: 'localhost',
//     user: 'root',
//     post: 3000,
//     password: '',
//     database: 'cenema',
//     multipleStatements: true
// });

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Success DB connection');
});


//session
router.use(session({
    secret: 'sid',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));


router.use(function(req,res,next){
    if (req.session.user) {
    	login.logined = req.session.user.logined;
    	login.username = req.session.user.username;
    }
	next();	
});

/* GET home page. */
router.get('/', function (req, res, next) {
        const sql1 = "SELECT distinct movie_id, movie_name, movie_img FROM movie natural join box_office WHERE release_date <= current_timestamp() ORDER BY ratio limit 5;";
        const sql2 = "SELECT movie_id, movie_name, movie_img FROM movie WHERE release_date > current_timestamp() ORDER BY ratio limit 5;";

        const sql3 = "SELECT distinct * FROM movie natural join box_office natural join actor WHERE release_date <= current_timestamp() ORDER BY ratio limit 1;"

        // function

        connection.query(sql1+sql2+sql3, function(error,results,fields){

            let screening = [];
            let pre_release = [];
            let movie_selected = results[2][0];

            results[0].forEach((element)=>{
                screening.push(element);
            });
            results[1].forEach((element)=>{
                pre_release.push(element);
            })

        res.render('index.ejs', {
            logined: login.logined,
            username: login.username,
            movie : [ 
                screening,pre_release
            ],
            movie_selected : movie_selected
        });
    });
});

router.get('/ec2',function(rq,res){
    ec2.describeInstances({},function(err,data){
        res.json(data);
    })
});

router.get('/movie',function(req,res){
    const movie_id = req.query.movie_id;
    const sql = "SELECT * FROM movie natural join actor WHERE movie_id = ?;";
    connection.query(sql,[movie_id],(error,results,fileds)=>{
        results[0].type = "movie_selected";
        res.json(results[0]) ;
    });
});


router.get('/login',function(req,res,next){
	res.render('login',{
		logined : login.logined,
		username : login.username
	});
});

router.get('/register',function(req,res,next){
	res.render('register',{
		logined : login.logined,
		username : login.username
	});
});

router.get('/reserv',function(req,res,next){
	res.render('reservation',{
        logined : login.logined,
        username : login.username,
    });
});

router.get('/api/reserv',function(req,res,next){
    const sql = "SELECT reservation_id, movie_img, movie_name, cinema_name, screen_no, box_office.date,start_time,running_time, amount from reservation natural join box_office natural join movie natural join cinema natural join screen natural join payment;";
    connection.query(sql,function(err,results,fields){
        res.json({
            type : "reservation_list",
            results
        });
    });
})

router.get('/payment',function(req,res,next){
    res.render('payment',{
        logined : login.logined,
        username : login.username
    });
});


router.get('/suggestion', function (req, res) {
    var sql = 'SELECT * FROM suggestion';
    connection.query(sql, function (error, results, fields) {
        if (req.session.user) {
            res.render('suggestion', {
                logined: req.session.user.logined,
                username: req.session.user.user_name,
                results
            });
        }
        else {
            res.render('suggestion', {
                logined: login.logined,
                username: login.username,
                results
            });
        }
    });
});

router.get('/suggestion_insert', function (req, res) {
    if (req.session.user) {
        res.render('suggestion_insert', {
            logined: req.session.user.logined,
            username: req.session.user.user_name
        });
    }
    else {
        res.redirect('login');
    }
});

router.get('/suggestion/:suggestion_id', function (req, res) {
    var suggestion_id = req.url.split("/")[2];
    var sql1 = 'SELECT * FROM suggestion WHERE suggestion_id = ?; ';
    var sql2 = 'SELECT * FROM comment WHERE suggestion_id = ?; ';

    connection.query('UPDATE suggestion SET view = view + 1 WHERE suggestion_id = ?', [suggestion_id]);
    connection.query(sql1 + sql2, [suggestion_id, suggestion_id], function(error, results, fields){
        results1 = results[0];
        results2 = results[1];
        if (req.session.user) {    
            res.render('suggestion_id', {
                logined: req.session.user.logined,
                username: req.session.user.user_name,
                results1,
                results2,
                suggestion_id
            });
        }
        else {
            res.render('suggestion_id', {
                logined: false,
                username: " ",
                results1,
                results2,
                suggestion_id
            });
        }
    })
});


router.post('/', function(req, res){
    var username = req.body.username;
    var password = req.body.password;

    var sql = 'SELECT * FROM member WHERE username = ?';
    connection.query(sql, [username], function (error, results, fields) {
        if (results.length == 0) {
            res.render('login', { alert: true });
        } else {
            var db_pwd = results[0].password;

            if (password == db_pwd) {
                //session
                req.session.user = {
                    logined: true,
                    username: results[0].username
                }

        
            }
                res.redirect('/');
        }
    });
});

router.post('/register', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
	var pwdconf = req.body.pwdconf;
	var birth = req.body.birth;
	var sex = req.body.sex;
	var address = req.body.address;

    if (password !== pwdconf) {
        res.redirect('register');
    }
    else {
        var sql = 'SELECT * FROM member WHERE username = ?';
        connection.query(sql, [username], function (error, results, fields) {
            if (results.length == 0) {
                connection.query("INSERT INTO member(username, password, birth, sex, address) VALUES(?,?,?,?,?)", [username, password, birth, sex, address], function () {
                    res.redirect('login');
                });
            }
            else {
                res.render("register");
            }
        });
    }
});

router.post('/suggestion_insert', function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var writer_name = req.session.user.username;

    
    console.log(req.body);

    var sql = 'INSERT INTO suggestion(title, content, writer_name) VALUES (?,?,?)';
    connection.query(sql, [title, content, writer_name], function (error, results, fields) {
        res.redirect('/suggestion');
    });
});

router.post('/suggestion/:suggestion_id', function(req, res){
    if(req.session.user){
        var suggestion_id = req.url.split("/")[2];
        var comment = req.body.comment;
        var writer_name = req.session.user.user_name;
        var sql = `INSERT INTO comment(suggestion_id, comment, writer_name) VALUES (?,?,?) ;`
        connection.query(sql, [suggestion_id, comment, writer_name], function(error, results, fields){
            res.redirect(`/suggestion/${suggestion_id}`);
        });
    }
    else {
        res.render('login.ejs');
    }
});

module.exports = router;