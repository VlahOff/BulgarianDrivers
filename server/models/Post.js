const { Schema, Types: { ObjectId }, model } = require('mongoose');

const postSchema = new Schema({
  carNumber: { type: String, required: true },
  title: { type: String, required: true },
  post: { type: String, required: true },
  rating: { type: Number, required: true },
  createdOn: { type: Date, default: Date.now },
  owner: { type: ObjectId, ref: 'User' }
});

const Post = model('Post', postSchema);

module.exports = Post;