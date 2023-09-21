var express = require('express');
var router = express.Router();


const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(__dirname + '/../data/db.json');
const db = low(adapter);
const shortid = require('shortid');
const dbjs = require('../db/db.js');
const mongoose = require('mongoose');
const moment = require('moment');
const AccountModel = require('../models/AccountModel');
const { render } = require('ejs');

//記帳本列表
router.get('/account', function(req, res, next) {
  AccountModel.find().sort( {
    time: -1
  }) 
  .then( data => {
    res.render('list', {
      accounts : data, moment : moment
    })
  })
    .catch( err => {
        res.status(500).send("讀取失敗");
        return;
    });
  })

router.get('/Menu' ,(req, res, next) => {
  res.render('fong')
}) 

router.get('/account/create', function(req, res, next) {
  res.render('create');
});

router.get('/account/:id', (req, res) => {
  let id = req.params.id
  AccountModel.deleteOne( {
    _id : id
  })
  .then(data => {
    res.render('success', {
      msg : "刪除成功", url: '/account'
    })
  })
  .catch( err => {
    res.status(500).send("刪除失敗")
  })
});


router.post('/account', (req,res) => {
  AccountModel.create( {
    ...req.body,
    time : moment(req.body.time).toDate()
  })
  .then(data => {
    res.render('success', {
      msg : '添加成功',
      url : '/account'
    })
  })
  .catch(error => {
    if (error) {
      res.status(500).send('插入失敗')
      return;
    } 
  } );

})

module.exports = router;
