import React from 'react'
import PropTypes from 'prop-types';
import { useAuth } from './auth';

CommentPostButton.propTypes = {
  postId: PropTypes.node.isRequired,
  setRefreshComments: PropTypes.func.isRequired,
  refreshComments: PropTypes.bool.isRequired,
};
function CommentPostButton({ postId, setRefreshComments, refreshComments }) {
  const [commentBox, setCommentBox] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const [error, setError] = React.useState(null);
  const auth = useAuth();

  const sendComment = async e => {
    e.preventDefault();
    const content = {
      userId: auth.user.userId,
      postId,
      content: comment
    }
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(content)
    }

    const response = await fetch('http://localhost:9000/api/comment-post', options);
    if (response.status === 200) {
      setError(null);
      setComment('');
      setRefreshComments(!refreshComments);
      setCommentBox(false);
    }
    else {
      setError('Ocurrio un error con la API');
    }
  }

  return (
    <>
      {
        error ? (
          <p>{error}</p>
        ) : (
          commentBox ? (
            <form onSubmit={sendComment}>
              <br />
              <label>
                <textarea
                  rows="3"
                  cols="50"
                  onChange={e => setComment(e.target.value)}
                  defaultValue={comment}
                  placeholder='Leave a comment'>
                </textarea>
              </label>
              <div>
                <button
                  type='submit'
                >
                  Comment
                </button>
                <button
                  onClick={() => setCommentBox(false)}
                >
                  Cancel
                </button>
              </div>
              <br />
            </form>
          ) : (
            <button
              onClick={() => setCommentBox(true)}
            >
              Comment
            </button>
          )
        )
      }
    </>
  )
}

export { CommentPostButton }