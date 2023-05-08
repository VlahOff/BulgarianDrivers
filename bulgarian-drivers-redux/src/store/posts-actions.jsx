import * as postService from '../services/postsService';
import store from './index';
import { postsActions } from './posts';
import { uiActions } from './ui';
import { setErrorMessage } from './ui-actions';
import { getVotesForDriversComments } from './votes-actions';

export const getCarList = () => {
  return (dispatch) => {
    dispatch(uiActions.startLoading());
    postService.getCarList()
      .then(res => dispatch(postsActions.setCarList(res)))
      .catch(err => dispatch(setErrorMessage(err)))
      .finally(() => dispatch(uiActions.stopLoading()));
  };
};

export const getCommentsForCar = (driverId) => {
  return (dispatch) => {
    dispatch(uiActions.startLoading());
    Promise.all([
      postService.getCar(driverId),
      postService.getPosts(driverId)
    ])
      .then(([car, comments]) => {
        dispatch(postsActions.setCar(car));
        dispatch(postsActions.setComments(comments));
        dispatch(getVotesForDriversComments(car._id));
      })
      .catch(err => dispatch(setErrorMessage(err)))
      .finally(() => dispatch(uiActions.stopLoading()));
  };
};

export const getUserComments = () => {
  return (dispatch) => {
    dispatch(uiActions.startLoading());
    postService.getUserPosts()
      .then(res => dispatch(postsActions.setComments(res)))
      .catch(err => dispatch(setErrorMessage(err)))
      .finally(() => dispatch(uiActions.stopLoading()));
  };
};

export const createNewPost = (data, navigate) => {
  return (dispatch) => {
    dispatch(uiActions.startLoading());
    postService.createPost(data)
      .then(res => {
        postsActions.setComments(res);
        navigate(`/drivers/${res.carId}`);
      })
      .catch(err => dispatch(setErrorMessage(err)))
      .finally(() => dispatch(uiActions.stopLoading()));
  };
};

export const createNewPostForDriver = (data) => {
  return (dispatch) => {
    const car = store.getState().posts.car;

    dispatch(uiActions.startLoading());
    postService.createPost({
      carNumber: car.carNumber,
      title: data.title,
      post: data.post,
    })
      .then(res => dispatch(postsActions.addNewComment(res)))
      .catch(err => dispatch(setErrorMessage(err)))
      .finally(() => {
        dispatch(uiActions.stopLoading());
        dispatch(postsActions.toggleAddModal());
      });
  };
};

export const editPost = (data) => {
  return (dispatch) => {
    const post = store.getState().posts.selectedPost;

    dispatch(uiActions.startLoading());
    postService.editPost(data, post.carNumber, post._id)
      .then(res => {
        dispatch(postsActions.addEditedComment(res));
      })
      .catch(err => dispatch(setErrorMessage(err)))
      .finally(() => {
        dispatch(uiActions.stopLoading());
        dispatch(postsActions.toggleEditModal());
      });
  };
};

export const deletePost = () => {
  return (dispatch) => {
    const post = store.getState().posts.selectedPost;

    dispatch(uiActions.startLoading());
    postService.deletePost(post._id)
      .then(() => {
        dispatch(postsActions.removeComment(post._id));
      })
      .catch(err => dispatch(setErrorMessage(err)))
      .finally(() => {
        dispatch(uiActions.stopLoading());
        dispatch(postsActions.toggleDeleteModal());
      });
  };
};

export const searchCarList = (query) => {
  return (dispatch) => {
    dispatch(uiActions.startLoading());
    postService.searchCarList(query)
      .then(res => {
        if (res.length === 0) {
          dispatch(postsActions.setSearchError('No posts found.'));
          dispatch(postsActions.setSearchResults([]));
          return;
        }
        dispatch(postsActions.setSearchResults(res));
      })
      .catch(err => dispatch(setErrorMessage(err)))
      .finally(() => dispatch(uiActions.stopLoading()));
  };
};