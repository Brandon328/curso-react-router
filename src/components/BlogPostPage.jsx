import React from 'react'
import { createPortal } from 'react-dom';
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "./auth";
import { useApi } from "./useApi";
import { LikePostButton } from "./LIkePostButton";
import { CommentPostButton } from "./CommentPostButton";
import { ModalContent } from "./ModalContent";
import { BlogPageContext } from './BlogPage';

function BlogPostPage() {
  const { slug } = useParams();
  const { posts } = useApi();
  const { setUpdated } = React.useContext(BlogPageContext);

  const [error, setError] = React.useState(null);
  const [commentsList, setCommentsList] = React.useState({});
  const [refreshComments, setRefreshComments] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const auth = useAuth();
  const navigate = useNavigate();
  const post = posts.find(post => post.slug === slug);

  const returnToBlog = () => {
    navigate('/blog');
  }

  const deletePost = async (postId) => {
    const options = {
      method: 'DELETE'
    }

    const response = await fetch(`http://localhost:9000/api/delete-post/${postId}`, options);
    if (response.status === 200) {
      setError(null);
      setUpdated(true);
      navigate('/blog');
    }
    else {
      setError('Ocurrio un error con la API');
      throw new Error(error);
    }
  }

  React.useEffect(() => {
    if (post) {
      fetch(`http://localhost:9000/api/get-comments/${post.postId}`)
        .then(response => response.json())
        .then(data => setCommentsList(data));
    }
  }, [post, refreshComments])

  return (
    <>
      {
        showModal && createPortal(
          <ModalContent
            onClose={() => setShowModal(false)}
            onYes={() => deletePost(post.postId)}
          />,
          document.body
        )
      }
      {
        post ? (
          <>
            <h1>{post.title}</h1>
            <i>{post.username}</i>
            <p>{post.content}</p>
            <button
              onClick={returnToBlog}
            >
              Volver
            </button>
            {
              post?.username === auth.user?.username && (
                <>
                  <button
                    onClick={() => setShowModal(true)}
                  >Delete post</button>
                  <button>Edit post</button>
                </>
              )
            }
            {
              auth.user && (
                <>
                  <LikePostButton postId={post.postId} />
                  <CommentPostButton
                    postId={post.postId}
                    setRefreshComments={setRefreshComments}
                    refreshComments={refreshComments}
                  />
                </>
              )
            }
            {
              commentsList.length > 0 ? (
                commentsList.map((comment, key) =>
                  <div key={key}>
                    <hr />
                    <p>
                      <i>@{comment.username}</i>
                      <span>
                        {
                          (() => {
                            const date = new Date(comment.date);
                            return ` - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                          })()
                        }
                      </span>
                    </p>
                    <p>
                      {comment.content}
                    </p>
                  </div>
                )
              ) : (
                <p>There are no comments yet</p>
              )
            }
          </>
        ) : (
          <span>loading...</span>
        )
      }
    </>
  )
}

export { BlogPostPage }