import { useContext, useEffect } from 'react';

import AuthContext from '../../contexts/authContext';
import PostsContext from '../../contexts/postsContext';

import Comment from '../shared/Comment';
import DeleteCommentModal from '../shared/DeleteCommentModal';
import EditCommentModal from '../shared/EditCommentModal';
import Card from '../UI/Card';

import classes from './UserPosts.module.css';

const UserPosts = (props) => {
  const { comments, loadUserComments, isEditModalOpen, isDeleteModalOpen } =
    useContext(PostsContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    loadUserComments();
  }, [loadUserComments]);

  return (
    <>
      {isEditModalOpen && <EditCommentModal />}
      {isDeleteModalOpen && <DeleteCommentModal />}
      <Card className={classes.card}>
        <header className={classes.header}>
          <h1>Your posts</h1>
        </header>
        <ul className={classes['posts-list']}>
          {comments.map((p) => (
            <Comment key={p._id} user={user} post={p} />
          ))}
        </ul>
      </Card>
    </>
  );
};

export default UserPosts;
