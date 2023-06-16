const Post = require('../models/Post');
const Car = require('../models/Car');
const Vote = require('../models/Vote');

async function getCar(carId) {
	const car = await Car.findById(carId).lean();

	return car;
}

async function getCarList() {
	const list = await Car.find({}).sort({ updatedOn: -1 }).lean();

	return list;
}

async function searchCarList(query) {
	const result = await Car.find({
		carNumber: { $regex: query, $options: 'i' },
	});

	return result;
}

async function getUserPosts(userId) {
	const result = await Post.find({ owner: userId })
		.sort({ updatedOn: -1 })
		.lean();

	return result;
}

async function getPosts(carId) {
	const posts = await Post.find({ carId: carId })
		.sort({ updatedOn: -1 })
		.lean();

	return posts;
}

async function createPost(carNumber, title, post, username, userId) {
	let car = await Car.findOne({ carNumber: carNumber }).exec();

	if (!car) {
		car = await Car.create({ carNumber });
	}

	const postData = await Post.create({
		carNumber: carNumber,
		carId: car._id,
		title: title,
		post: post,
		username: username,
		owner: userId,
	});
	await Vote.create({
		driverId: car._id,
		commentId: postData._id,
	});

	car.updatedOn = Date.now();
	car.posts.push(postData._id);
	car.save();
	return postData;
}

async function editPost(title, post, postId, userId) {
	const postDb = await Post.findById({ _id: postId });
	if (userId !== postDb.owner.toString()) {
		throw new Error('NOT_THE_OWNER');
	}
	const carDb = await Car.findById({ _id: postDb.carId });

	carDb.updatedOn = Date.now();
	carDb.save();

	postDb.title = title;
	postDb.post = post;
	postDb.updatedOn = Date.now();
	postDb.save();

	return postDb;
}

async function deletePost(postId, userId) {
	const post = await Post.findById({ _id: postId });
	if (userId !== post.owner.toString()) {
		throw new Error('NOT_THE_OWNER');
	}

	post.deleteOne({ _id: postId });
	await Vote.findOneAndRemove({ commentId: postId });
	const car = await Car.findOne({ carNumber: post.carNumber });

	car.posts = car.posts.filter(p => p.toString() !== post._id.toString());

	car.save();
	return post;
}

module.exports = {
	searchCarList,
	getUserPosts,
	getCar,
	getCarList,
	getPosts,
	createPost,
	editPost,
	deletePost,
};
