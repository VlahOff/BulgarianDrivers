import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserComments } from '../../store/posts-actions';
import Card from '../UI/Card/Card';
import Comment from '../shared/Comment';
import DeleteCommentModal from '../shared/DeleteCommentModal';
import EditCommentModal from '../shared/EditCommentModal';

import classes from './UserPosts.module.css';

const UserPosts = () => {
  const dispatch = useDispatch();
  const { comments, isEditModalShown, isDeleteModalShown } = useSelector(state => state.posts);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    dispatch(getUserComments());
  }, []);

  return (
    <>
      {isEditModalShown && <EditCommentModal />}
      {isDeleteModalShown && <DeleteCommentModal />}
      <Card className={classes.card}>
        <header className={classes.header}>
          <h1>Your posts</h1>
        </header>
        <ul className={classes['posts-list']}>
          {comments.map((p) => (
            <Comment key={p._id} user={user} post={p} />
          ))}
          {!comments.length && <p className={classes['error-message']}>You haven`t posted yet!</p>}
        </ul>
      </Card>
    </>
  );
};

export default UserPosts;
