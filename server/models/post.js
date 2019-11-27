const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    link: String,
    text: String,
    isDeleted: { type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now },
    _creator: { type: Schema.ObjectId, ref: 'user'}

});

// Write some encrption for Password

module.exports = mongoose.model('Post', postSchema);
