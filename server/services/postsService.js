const Post = require('../models/Post');
const Car = require('../models/Car');

async function getCar(carId) {
  const car = await Car.findById(carId).lean();

  return car;
}

async function getCarList() {
  const list = await Car.find({}).sort({ updatedOn: -1 }).lean();

  return list;
}

async function getPosts(carId) {
  const posts = await Post.find({ carId: carId }).lean();

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
    owner: userId
  });

  car.updatedOn = Date.now();
  car.posts.push(postData._id);
  car.save();
  return postData;
}

async function editPost(title, post, postId) {
  const postDb = await Post.findById({ _id: postId });

  postDb.title = title;
  postDb.post = post;
  postDb.updatedOn = Date.now();
  postDb.save();

  return postDb;
}

async function deletePost(postId) {
  return Post.findByIdAndRemove(postId);
}

module.exports = {
  getCar,
  getCarList,
  getPosts,
  createPost,
  editPost,
  deletePost
};