import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AuthContext from '../../contexts/authContext';
import PostsContext from '../../contexts/postsContext';
import VotesContext from '../../contexts/votesContext';

import Comment from '../shared/Comment';
import DeleteCommentModal from '../shared/DeleteCommentModal';
import EditCommentModal from '../shared/EditCommentModal';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import LinkTo from '../UI/Links/LinkTo';
import AddCommentModal from './AddCommentModal';

import classes from './PostDetails.module.css';

const PostDetails = (props) => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { getVotesForDriversComments } = useContext(VotesContext);
  const {
    car,
    comments,
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    toggleAddModal,
    loadCommentsForDriver,
  } = useContext(PostsContext);

  useEffect(() => {
    loadCommentsForDriver(id);
    getVotesForDriversComments(id);
  }, [id, loadCommentsForDriver, getVotesForDriversComments]);

  return (
    <>
      {isAddModalOpen && <AddCommentModal />}
      {isEditModalOpen && <EditCommentModal />}
      {isDeleteModalOpen && <DeleteCommentModal />}

      <Card className={classes.card}>
        <header className={classes.header}>
          <LinkTo to=".." relative="path">
            <i className="fa-solid fa-chevron-left"></i> Back
          </LinkTo>

          <h1 className={classes.title}>
            Comments about:
            <span className={classes.number}> {car.carNumber}</span>
          </h1>

          <Button onClick={toggleAddModal}>New comment</Button>
        </header>

        <ul className={classes['posts-list']}>
          {comments.map((c) => {
            return <Comment key={c._id} user={user} post={c} />;
          })}
        </ul>
      </Card>
    </>
  );
};

export default PostDetails;
