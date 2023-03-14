const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const readerSchema = new Schema({
    grediiit : {
        type: String,
        required : true
    },
    follower: {
        type: String,
        required : true
    },
    status: {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('Reader', readerSchema);