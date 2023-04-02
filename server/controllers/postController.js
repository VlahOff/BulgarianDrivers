const { isUser } = require('../middlewares/guards');
const {
  createPost,
  getCarList,
  getPosts,
  getCar,
  editPost,
  deletePost,
  searchCarList,
  getUserPosts,
} = require('../services/postsService');
const errorParser = require('../utils/errorParser');

const postController = require('express').Router();

const plateReg = /^[A-Z]{1,2}[0-9]{4}[A-Z]{2}$/;

postController.get('/car', async (req, res) => {
  try {
    const car = await getCar(req.query.carId);

    res.status(200).json(car);
  } catch (error) {
    res.status(400).json({
      message: errorParser(error),
    });
  }
});

postController.get('/carList', async (req, res) => {
  try {
    const list = await getCarList();

    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({
      message: errorParser(error),
    });
  }
});

postController.get('/searchCarList', async (req, res) => {
  try {
    const searchQuery = req.query.search;

    const result = await searchCarList(searchQuery);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: errorParser(error),
    });
  }
});

postController.get('/userPosts', isUser(), async (req, res) => {
  try {
    const userId = req.user.userId;
    const userPosts = await getUserPosts(userId);

    res.status(200).json(userPosts);
  } catch (error) {
    res.status(400).json({
      message: errorParser(error),
    });
  }
});

postController.get('/posts', async (req, res) => {
  try {
    const posts = await getPosts(req.query.carId);

    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({
      message: errorParser(error),
    });
  }
});

postController.post('/posts', isUser(), async (req, res) => {
  try {
    const carNumber = req.body.carNumber;
    const title = req.body.title;
    const post = req.body.post;

    if (!plateReg.test(carNumber)) {
      throw new Error('INVALID_LICENSE_PLATE_NUMBER');
    }
    if (title.trim().length < 10) {
      throw new Error('TITLE_TOO_SHORT');
    }
    if (post.trim().length < 10) {
      throw new Error('POST_TOO_SHORT');
    }

    const postData = await createPost(
      carNumber,
      title,
      post,
      req.user.username,
      req.user.userId
    );

    res.status(200).json(postData);
  } catch (error) {
    res.status(400).json({
      message: errorParser(error),
    });
  }
});

postController.put('/posts', isUser(), async (req, res) => {
  try {
    const postId = req.query.postId;
    const title = req.body.title;
    const post = req.body.post;
    const userId = req.user.userId;

    if (!postId.trim()) {
      throw new Error('NO_POST_ID');
    }
    if (title.trim().length < 10) {
      throw new Error('TITLE_TOO_SHORT');
    }
    if (post.trim().length < 10) {
      throw new Error('POST_TOO_SHORT');
    }

    const editedPost = await editPost(title, post, postId, userId);

    res.status(200).json(editedPost);
  } catch (error) {
    res.status(400).json({
      message: errorParser(error),
    });
  }
});

postController.delete('/posts', isUser(), async (req, res) => {
  try {
    const postId = req.query.postId;

    if (!postId.trim()) {
      throw new Error('NO_POST_ID');
    }

    await deletePost(postId, req.user.userId);

    res.status(200).json({ message: 'Done' });
  } catch (error) {
    res.status(400).json({
      message: errorParser(error),
    });
  }
});

module.exports = postController;
