const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: { type: Date, default: Date.now },
    title: { type: String, required: true },
    text: {type: String, required: true },
    isDeleted: { type: Boolean, default: false},
    
    votes: [{
        positive: {
          type: String,
        },
        negative: {
          type: String,
        }
      }],
});



module.exports = mongoose.model('Post', postSchema);
