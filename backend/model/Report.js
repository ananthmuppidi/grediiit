const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    reportedby: {
        type: String,
        required : true
    },
    reporteduser: {
        type: String,
        required : true
    },
    username: {
        concern: String,
        required: true
    },
    posttext: {
        type: String,
        required: true
    },
    status :{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Report', reportSchema);