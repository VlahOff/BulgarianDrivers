import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AuthContext from '../../contexts/authContext';
import * as postService from '../../services/postsService';

import Button from '../UI/Button';
import Card from '../UI/Card';
import AddCommentModal from './AddCommentModal';
import DeleteCommentModal from './DeleteCommentModal';
import EditCommentModal from './EditCommentModal';
import Comment from './Comment';

import classes from './PostDetails.module.css';

const PostDetails = (props) => {
  const { id } = useParams();
  const authCtx = useContext(AuthContext);

  const [car, setCar] = useState({});
  const [comments, setComments] = useState([]);

  const [selectedPost, setSelectedPost] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      postService.getCar(id),
      postService.getPosts(id)
    ])
      .then(([car, comments]) => {
        setCar(car);
        setComments(comments);
      });

  }, [id]);

  const addNewPost = (post) => {
    setComments(state => [...state, post]);
    toggleAddModal();
  };

  const toggleAddModal = () => {
    setIsAddModalOpen(state => !state);
  };

  const addEditedPost = (post) => {
    setComments(state => {
      const oldState = [...state];
      const newState = oldState.filter(p => p._id !== post._id);

      return [...newState, post];
    });

    toggleEditModal();
    setSelectedPost({});
  };

  const toggleEditModal = (post) => {
    setSelectedPost(post);
    setIsEditModalOpen(state => !state);
  };

  const removePost = () => {
    setComments(state => {
      const oldState = [...state];
      const newState = oldState
      .filter(p => p._id !== selectedPost._id);

      return [...newState];
    });

    postService.deletePost(selectedPost._id);
    closeDeleteModal();
  };

  const deletionConfirm = (post) => {
    setSelectedPost(post);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedPost({});
  };

  return (
    <>
      {isAddModalOpen && <AddCommentModal
        car={car}
        toggleModal={toggleAddModal}
        addNewPost={addNewPost}
      />
      }
      {isEditModalOpen && <EditCommentModal
        car={car}
        postForEdit={selectedPost}
        toggleModal={toggleEditModal}
        addEditedPost={addEditedPost}
      />}
      {isDeleteModalOpen && <DeleteCommentModal
        closeDeleteModal={closeDeleteModal}
        removePost={removePost}
      />}
      <Card className={classes.card}>
        <header className={classes.header}>
          <h1 className={classes.title}>Comments about:
            <span className={classes.number}> {car.carNumber}</span>
          </h1>
          <Button onClick={toggleAddModal}>New comment</Button>
        </header>
        <ul className={classes['posts-list']}>
          {comments.map(c => {
            return <Comment
              key={c._id}
              user={authCtx.user}
              editPost={toggleEditModal}
              deletionConfirm={deletionConfirm}
              post={c}
            />;
          })}
        </ul>
      </Card>
    </>
  );
};

export default PostDetails;