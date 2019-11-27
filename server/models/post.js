const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    text: {type: String, required: true },
    upvotes: {type: Number, default: 0},
    isDeleted: { type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now },
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}

});

postSchema.methods.upvote = function(cb) {
    this.upvote += 1;
    this.save(cb);
}


module.exports = mongoose.model('Post', postSchema);
