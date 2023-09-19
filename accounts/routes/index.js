var express = require('express');
var router = express.Router();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(__dirname + '/../data/db.json');
const db = low(adapter);
const shortid = require('shortid');

let accounts = [1, 2, 5 ,6]
let msg = "添加成功";
//let url = redirect

//記帳本列表
router.get('/account', function(req, res, next) {
  let accounts = db.get('accounts').value();
  res.render('list', {accounts: accounts});
})

router.get('/Menu' ,(req, res, next) => {
  
  res.render('fong')
}) 

router.get('/account/create', function(req, res, next) {

  res.render('create');
});

router.get('/account/:id', (req, res) => {
  let id = req.params.id
  db.get('accounts').remove( {
    id : id
  }).write();
  res.render('success', {
    msg : "刪除成功",
    url : "/account"
  })
});


router.post('/account', (req,res) => {
 // console.log(__dirname + '/../data/db.json')
  let id = shortid.generate();
  db.get('accounts').unshift({
    id : id,
    ...req.body
  }).write();
  res.render('success', {
    msg : msg ,
    url : '/account'
  })
})

module.exports = router;
