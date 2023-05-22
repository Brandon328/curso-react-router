import React from 'react'
import PropTypes from 'prop-types';
import { useAuth } from './auth';

CommentPostButton.propTypes = {
  postId: PropTypes.node.isRequired,
};
function CommentPostButton({ postId }) {
  const [commentBox, setCommentBox] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const [error, setError] = React.useState(null);
  const auth = useAuth();

  const sendComment = async () => {
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
            <div>
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
                  onClick={sendComment}
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
            </div>
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