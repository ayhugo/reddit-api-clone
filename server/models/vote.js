const mongoose = require('mongoose');
//https://stackoverflow.com/questions/51197143/how-to-implement-an-upvote-downvote-system-in-mongodb-mongoose
const voteSchema = mongoose.Schema({
    votes: [{
        id: {
          type: String,
          required: true,
        },
        isUpvote: {
          type: Boolean,
          required: true
        }
      }],
      _post:  {type: Schema.ObjectId, ref: 'Post'},
      count: {type: Number, required: true}
    });
  
  
  module.exports = mongoose.model('Vote', voteSchema);
  