var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var data = require('../model/admin');
var body = require('body-parser');
var session = require('express-session');
var User = require('../model/user');



//Input Data
router.get('/input',function(req,res,next){
  if(req.session.active == "" || req.session.active == null || req.session.active == "0"){
    res.redirect('/login');
  } else {
    User.find(function(err, user) {
        res.render('input');
    });
  }
});


router.post('/input', function(req, res, next) {
  var karyawan = new data({
    nama: req.body.nama,
    status : req.body.status,
    mac: req.body.mac
  })
  karyawan.save(function(err){
    if (err) return next(err);
    console.log(data);
    res.redirect('/tampil');
    });
  });

router.post('/putdata/:id', function(req, res, next) {
  data.findById(req.params.id, function(err, data) {
      if (err){
        res.send(err);
      }
    data.nama = req.body.nama,
    data.mac = req.body.mac,
    data.save(function(err, data) {
      if (err){
        res.send(err);
      }
      res.redirect('/tampil');
    });
  });
});

router.get('/deldata/:id', function(req, res, next) {
  data.remove({
    _id: req.params.id
  },
  function(err) {
    if (err){
      res.send(err);
    }
    res.redirect('/tampil');
  });
});



module.exports = router;