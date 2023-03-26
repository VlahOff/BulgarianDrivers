import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AuthContext from '../../contexts/authContext';
import PostsContext from '../../contexts/postsContext';

import Button from '../UI/Button';
import Card from '../UI/Card';
import AddCommentModal from './AddCommentModal';
import Comment from './Comment';
import DeleteCommentModal from './DeleteCommentModal';
import EditCommentModal from './EditCommentModal';

import classes from './PostDetails.module.css';

const PostDetails = (props) => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const {
    car,
    comments,
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    toggleAddModal,
    loadCommentsForDriver
  } = useContext(PostsContext);

  useEffect(() => {
    loadCommentsForDriver(id);
  }, [loadCommentsForDriver, id]);

  return (
    <>
      {isAddModalOpen && <AddCommentModal />}
      {isEditModalOpen && <EditCommentModal />}
      {isDeleteModalOpen && <DeleteCommentModal />}
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
              user={user}
              post={c}
            />;
          })}
        </ul>
      </Card>
    </>
  );
};

export default PostDetails;