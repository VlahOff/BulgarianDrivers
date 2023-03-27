import { createContext, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as postService from '../services/postsService';
import AuthContext from './authContext';
import ErrorContext from './errorContext';
import { useLoadingContext } from './loadingContext';

const PostsContext = createContext({
  car: {},
  carList: [],
  comments: [],
  selectedPost: {},
  isAddModalOpen: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  toggleAddModal: () => { },
  toggleEditModal: () => { },
  toggleDeleteModal: () => { },
  loadCarList: () => { },
  loadCommentsForDriver: () => { },
  loadUserComments: () => { },
  addNewPost: () => { },
  editPost: () => { },
  removePost: () => { }
});

export const PostsProvider = (props) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { setErrorMessage } = useContext(ErrorContext);
  const [startLoading, stopLoading] = useLoadingContext();
  const [car, setCar] = useState({});
  const [carList, setCarList] = useState([]);
  const [comments, setComments] = useState([]);

  const [selectedPost, setSelectedPost] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const loadCarList = useCallback(() => {
    startLoading();
    postService.getCarList()
      .then(setCarList)
      .catch(setErrorMessage)
      .finally(() => {
        stopLoading();
      });
  }, [setErrorMessage, startLoading, stopLoading]);

  const loadCommentsForDriver = useCallback((driverId) => {
    startLoading();
    Promise.all([
      postService.getCar(driverId),
      postService.getPosts(driverId)
    ])
      .then(([car, comments]) => {
        setCar(car);
        setComments(comments);
      })
      .catch(setErrorMessage)
      .finally(() => {
        stopLoading();
      });
  }, [setErrorMessage, startLoading, stopLoading]);

  const loadUserComments = useCallback(() => {
    startLoading();
    postService.getUserPosts()
      .then(data => {
        setComments(data);
      })
      .catch(setErrorMessage)
      .finally(() => {
        stopLoading();
      });
  }, [setErrorMessage, startLoading, stopLoading]);

  const addNewPost = (data) => {
    startLoading();
    postService.createPost({
      carNumber: car.carNumber,
      title: data.title,
      post: data.post,
    })
      .then(post => {
        setComments(state => [post, ...state]);
      })
      .catch(setErrorMessage)
      .finally(() => {
        stopLoading();
        toggleAddModal();
      });
  };

  const toggleAddModal = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setIsAddModalOpen(s => !s);
  };

  const editPost = async (data) => {
    startLoading();
    postService.editPost(data, selectedPost.carNumber, selectedPost._id)
      .then(editedPost => {
        setComments(state => {
          const newState = state.filter(p => p._id !== selectedPost._id);

          return [editedPost, ...newState];
        });
      })
      .catch(setErrorMessage)
      .finally(() => {
        stopLoading();
        toggleEditModal();
      });

  };

  const toggleEditModal = (post) => {
    if (post?.carNumber) {
      setSelectedPost(post);
    }
    setIsEditModalOpen(s => !s);
  };

  const removePost = () => {
    startLoading();
    setComments(state => {
      return state.filter(p => p._id !== selectedPost._id);
    });
    postService.deletePost(selectedPost._id)
      .catch(setErrorMessage)
      .finally(() => {
        stopLoading();
        toggleDeleteModal();
      });
  };

  const toggleDeleteModal = (post) => {
    if (post?.carNumber) {
      setSelectedPost(post);
    }
    setIsDeleteModalOpen(s => !s);
  };

  return <PostsContext.Provider
    value={{
      car,
      carList,
      comments,
      selectedPost,
      isAddModalOpen,
      isEditModalOpen,
      isDeleteModalOpen,
      toggleAddModal,
      toggleEditModal,
      toggleDeleteModal,
      loadCommentsForDriver,
      loadCarList,
      loadUserComments,
      addNewPost,
      editPost,
      removePost,
    }}
  >
    {props.children}
  </PostsContext.Provider>;
};

export default PostsContext;