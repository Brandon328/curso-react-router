import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from "./auth";
import { API_URL } from '../assets/API_URL';

LikePostButton.propTypes = {
  postId: PropTypes.node.isRequired,
};
function LikePostButton({ postId }) {
  const likeButtonRef = React.useRef(null);
  const auth = useAuth();
  const likePost = () => {
    likeButtonRef.current.textContent = 'Liked';
    likeButtonRef.current.style.background = 'white';
    likeButtonRef.current.style.color = 'black';
  }
  const dislikePost = () => {
    likeButtonRef.current.textContent = 'Like';
    likeButtonRef.current.style.background = 'black';
    likeButtonRef.current.style.color = 'white';
  }
  const toggleLike = async e => {
    const value = e.target.textContent;

    if (value == 'Like') {
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(
          {
            userId: auth.user.userId,
            postId: postId
          }
        )
      }
      const response = await fetch(`${API_URL}/like-post`, options);
      if (response.status === 200)
        likePost();
    }
    else {
      const options = {
        method: 'DELETE'
      }
      const response = await fetch(
        `${API_URL}/dislike-post/${auth.user.userId}/${postId}`,
        options);
      if (response.status === 200)
        dislikePost();
    }
  }
  React.useEffect(() => {
    fetch(`${API_URL}/is-post-liked/${auth.user.userId}/${postId}`)
      .then(res => res.json())
      .then(
        res => {
          if (res)
            likePost();
          else
            dislikePost();
        }
      )
  }, [postId])

  return (
    <button
      ref={likeButtonRef}
      onClick={toggleLike}
    >
      Like
    </button>
  )
}

export { LikePostButton }