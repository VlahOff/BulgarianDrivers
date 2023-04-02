const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const voteSchema = new Schema({
  driverId: { type: ObjectId, ref: 'Car' },
  commentId: { type: ObjectId, ref: 'Post' },
  votes: { type: Number, default: 0 },
  usersVotedUp: { type: [ObjectId], ref: 'User', default: [] },
  usersVotedDown: { type: [ObjectId], ref: 'User', default: [] },
});

const Vote = model('Vote', voteSchema);

module.exports = Vote;
