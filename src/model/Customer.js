const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerModelSchema = new Schema({
    rtn : String,
    email : String,
    salutation : String,
    first_name : String,
    middle_name : String,
    last_name : String,
    address_line_one : String,
    address_line_two : String,
    area : String,
    city : String,
    state : String,
    pincode : String,
    mobile_primary : String,
    mobile_secondary : String,
    landline : String,
    created: {  
        type: Date,
        default: Date.now()
    },
    updated: {  
        type: Date,
        default: Date.now()
    }
});

const Customer = mongoose.model('Customer', CustomerModelSchema );

module.exports = Customer;