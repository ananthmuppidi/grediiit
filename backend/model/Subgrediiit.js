const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subgrediiitSchema = new Schema({
    name: {
        type: String,
        unique : true,
        required : true
    },
    description: {
        type: String,
    },
    tags: {
        type: [String],
    },
    banned: {
        type: [String],
    },
    comments: {
        type: [String],
    },
    admin: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Subgrediiit', subgrediiitSchema);
