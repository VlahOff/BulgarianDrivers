const Vote = require('../models/Vote');

async function getVotes(driverId) {
  const votes = await Vote.find({ driverId: driverId }).lean();

  return votes;
}

async function upVote(commentId, userId) {
  const votes = await Vote.findOne({ commentId: commentId });

  if (votes.usersVotedDown.includes(userId)) {
    votes.usersVotedDown = votes.usersVotedDown.filter(u => u.toString() !== userId);
    votes.votes++;
  }

  if (votes.usersVotedUp.includes(userId)) {
    votes.usersVotedUp = votes.usersVotedUp.filter(u => u.toString() != userId);
    votes.votes--;
  } else {
    votes.usersVotedUp.push(userId);
    votes.votes++;
  }
  
  votes.save();
  return votes;
}

async function downVote(commentId, userId) {
  const votes = await Vote.findOne({ commentId: commentId });
  
  if (votes.usersVotedUp.includes(userId)) {
    votes.usersVotedUp = votes.usersVotedUp.filter(u => u.toString() !== userId);
    votes.votes--;
  }

  if (votes.usersVotedDown.includes(userId)) {
    votes.usersVotedDown = votes.usersVotedDown.filter(u => u.toString() !== userId);
    votes.votes++;
  } else {
    votes.usersVotedDown.push(userId);
    votes.votes--;
  }
  
  votes.save();
  return votes;
}

module.exports = {
  getVotes,
  upVote,
  downVote
};