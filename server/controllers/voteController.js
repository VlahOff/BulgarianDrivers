const { isAuthenticated } = require('../middlewares/guards');
const {
	getVotes,
	upVote,
	downVote,
	getUserVotes,
} = require('../services/voteService');
const errorParser = require('../utils/errorParser');

const voteController = require('express').Router();

voteController.get('/', async (req, res) => {
	try {
		const carId = req.query.carId;

		if (!carId) {
			throw new Error('NO_CAR_ID_PROVIDED');
		}

		const votes = await getVotes(carId);
		res.status(200).json(votes);
	} catch (error) {
		res.status(400).json({
			message: errorParser(error),
		});
	}
});

voteController.get('/userVotes', isAuthenticated(), async (req, res) => {
	try {
		const votes = await getUserVotes(req.user.userId);

		res.status(200).json(votes);
	} catch (error) {
		res.status(400).json({
			message: errorParser(error),
		});
	}
});

voteController.get('/upVote', isAuthenticated(), async (req, res) => {
	try {
		const commentId = req.query.commentId;

		if (!commentId) {
			throw new Error('NO_COMMENT_ID_PROVIDED');
		}
		const votes = await upVote(commentId, req.user.userId);

		res.status(200).json(votes);
	} catch (error) {
		res.status(400).json({
			message: errorParser(error),
		});
	}
});

voteController.get('/downVote', isAuthenticated(), async (req, res) => {
	try {
		const commentId = req.query.commentId;

		if (!commentId) {
			throw new Error('NO_COMMENT_ID_PROVIDED');
		}

		const votes = await downVote(commentId, req.user.userId);

		res.status(200).json(votes);
	} catch (error) {
		res.status(400).json({
			message: errorParser(error),
		});
	}
});

module.exports = voteController;
