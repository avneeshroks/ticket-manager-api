const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlumberModelSchema = new Schema({
    first_name : String,
    last_name : String,
    mobile_primary : String,
    address : String,
    city : String,
    state : String,
    created: {  
        type: Date,
        default: Date.now()
    },
    updated: {  
        type: Date,
        default: Date.now()
    }
});

const Plumber = mongoose.model('Plumber', PlumberModelSchema );

module.exports = Plumber;