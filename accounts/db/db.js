/** 

* @param {*} success
* @param {*} error
*/
module.exports = function(success, error) {

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/accounts');


mongoose.connection.once('open', () => {
    console.log('成功')
    success();
})

mongoose.connection.once('error', () => {
    error();
})

mongoose.connection.once('close', () => {
    console.log('關閉嚕');
})
}