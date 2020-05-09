const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ComplaintModelSchema = new Schema({
    srn : String,
    city : String,
    status : Number, // 1 = Open | 2 = In Progress | 3 = Closed
    customer : {
        type: mongoose.Schema.ObjectId,
        ref : 'Customer'
    },
    plumber : {
        type: mongoose.Schema.ObjectId,
        ref : 'Plumber'
    },
    created: {  
        type: Date,
        default: Date.now()
    },
    updated: {  
        type: Date,
        default: Date.now()
    }
});

const Complaint = mongoose.model('Complaint', ComplaintModelSchema );

module.exports = Complaint;