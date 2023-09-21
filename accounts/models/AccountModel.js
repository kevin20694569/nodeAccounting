const mongoose = require('mongoose');


let AccountSchema = new mongoose.Schema( {
    title : {
        type : String,
        require : true
    },
    time : Date,
    type : {
        type: Number,
        default : -1
    },
    account: {
        type : Number,
        require : true
    },
    remarks : {
        type : String
    }
});

let AccountModel = mongoose.model('accounts', AccountSchema);

module.exports = AccountModel;