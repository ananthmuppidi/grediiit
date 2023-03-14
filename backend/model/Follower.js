const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followerSchema = new Schema({
    follower: {
        type: String,
        required: true
    },
    followed: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Follower', followerSchema);