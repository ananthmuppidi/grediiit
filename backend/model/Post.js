const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  text: {
    type: String,
  },
  postedby: {
    type: String,
  },
  postedin: {
    type: String,
    required: true
  },
  upvote: {
    type: [String],
    default: []
  },
  downvote: {
    type: [String],
    default: []
  },
  postedbyemail: {
    type: String,
    required : true
  },
  comments: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('Post', postSchema);
