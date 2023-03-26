import { createContext, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as postService from '../services/postsService';
import AuthContext from './authContext';

const PostsContext = createContext({
  car: {},
  comments: [],
  selectedPost: {},
  isAddModalOpen: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  toggleAddModal: () => { },
  toggleEditModal: () => { },
  toggleDeleteModal: () => { },
  loadCommentsForDriver: () => { },
  addNewPost: () => { },
  editPost: () => { },
  removePost: () => { }
});

export const PostsProvider = (props) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [car, setCar] = useState({});
  const [comments, setComments] = useState([]);

  const [selectedPost, setSelectedPost] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const loadCommentsForDriver = useCallback((driverId) => {
    Promise.all([
      postService.getCar(driverId),
      postService.getPosts(driverId)
    ])
      .then(([car, comments]) => {
        setCar(car);
        setComments(comments);
      });
  }, []);

  const addNewPost = (data) => {
    postService.createPost({
      carNumber: car.carNumber,
      title: data.title,
      post: data.post,
    })
      .then(post => {
        setComments(state => [post, ...state]);
      });
    toggleAddModal();
  };

  const toggleAddModal = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setIsAddModalOpen(s => !s);
  };

  const editPost = async (data) => {
    const editedPost = await postService.editPost(data, car.carNumber, selectedPost._id);
    setComments(state => {
      const newState = state.filter(p => p._id !== selectedPost._id);

      return [editedPost, ...newState];
    });
    toggleEditModal();
  };

  const toggleEditModal = (post) => {
    if (post?.carNumber) {
      setSelectedPost(post);
    }
    setIsEditModalOpen(s => !s);
  };

  const removePost = () => {
    setComments(state => {
      return state.filter(p => p._id !== selectedPost._id);
    });
    postService.deletePost(selectedPost._id);
    toggleDeleteModal();
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
      comments,
      selectedPost,
      isAddModalOpen,
      isEditModalOpen,
      isDeleteModalOpen,
      toggleAddModal,
      toggleEditModal,
      toggleDeleteModal,
      loadCommentsForDriver,
      addNewPost,
      editPost,
      removePost,
    }}
  >
    {props.children}
  </PostsContext.Provider>;
};

export default PostsContext;