var express = require('express');
var router = express.Router();
var body= require('body-parser');
var data = require('../model/admin');
var User = require('../model/user');
var hash = require('password-hash');
var session = require('express-session');
var cookieParser = require('cookie-parser');

/* GET home page. */
router.use(body.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(session({
	secret : 'ridho123',
	saveUninitialized : true,
	resave : true,
	maxAge : 9999999999
	
}));

router.get('/', function(req,res,next){
	data.find({},function(err, data){
		if(err)
			return next(err);
		res.render('index', {data : data});
	});
});
/*
router.get('/tampil', function(req,res,next){
    if(req.session.active == "" || req.session.active == null || req.sesion.active == "0"){
        res.redirect('/login');
    }else{
	data.find({},function(err, data){
		if(err)
			return next(err);
		res.render('tampil', {data : data});
	});
    }
});
*/
router.get('/tampil', function(req, res, next) {
  if(req.session.active == "" || req.session.active == null || req.session.active == "0"){
    res.redirect('/login');
  } else {
    data.find(function(err, data) {
        res.render('tampil', { data: data });
    });
  }
});

router.get('/update/:id', function(req, res, next) {
    if(req.session.active == "" || req.session.active == null || req.session.active == "0"){
    res.redirect('/login');
  }
  else {
      data.findById(req.params.id, function(err, data) {
        res.render('update', {data:data});
  })};
});


//Get Login
router.get('/login',function(req,res,next){
  res.render('login');
});

//login User

router.post('/login', function(req, res, next){
    User.findOne({username: req.body.username}, function(err, doc){
        if (err) {
            return res.status(404).json({
                title: 'An error occured',
                error: err
            });
        } else if (!doc) {
            res.render('login', {message: "Invalid Username!"});
        } else if (!hash.verify(req.body.password, doc.password)){
            res.render('login', {message: "Invalid Password!"});
        } else {
        if (!req.session.active) {
            req.session.active = req.body.username
        }
            res.redirect('/tampil');
        }
    })
});

/* Signout User */
router.get('/logout', function(req, res){
   req.session.destroy(function(){
      console.log("user logged out.")
   });
   res.redirect('/login');
});

/* Signup User */
router.post('/signup', function(req, res){
   if(!req.body.username || !req.body.password || !req.body.email ){
      res.status("400");
      res.send("Invalid details!");
   } else {
        var user = new User({
        username: req.body.username,
        password : hash.generate(req.body.password),
        email: req.body.email,
      })
      user.save(function(err, result) {
        if (err) {
          return res.status(404).json({
            title: "An error occurred",
            error: err
          });
        }
        res.status(201).json({
          message: "User Saved",
          obj: result
        });
      });
   }
});


module.exports = router;
