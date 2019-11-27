const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    text: {type: String, required: true },
    isDeleted: { type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now },
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}

});


module.exports = mongoose.model('Post', postSchema);
