const Post = require('../models/Post');
const Car = require('../models/Car');

async function createPost(carNumber, title, comment, rating, userId) {
  let car = await Car.findOne({ carNumber: carNumber }).exec();

  if (!car) {
    try {
      car = await Car.create({
        carNumber: carNumber
      });

      console.log(car);
    } catch (error) {
      console.log(error.message);
    }
  }

  console.log(car);

  const post = await Post.create({
    carNumber: carNumber,
    title: title,
    post: comment,
    rating: rating,
    owner: userId
  });

  car.posts.push(post._id);
  car.save();

  console.log(post);
}

module.exports = {
  createPost
};