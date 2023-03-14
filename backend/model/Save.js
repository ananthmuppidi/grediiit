const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saveSchema = new Schema({
    saver: {
        type: String,
        required : true
    },
    postid: {
        type: String,
        required : true
    }
});

module.exports = mongoose.model('Save', saveSchema);