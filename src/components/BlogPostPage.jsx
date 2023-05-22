import React from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "./auth";
import { useApi } from "./useApi";
import { LikePostButton } from "./LIkePostButton";
import { CommentPostButton } from "./CommentPostButton";

function BlogPostPage() {
  const { slug } = useParams();
  const { posts } = useApi();
  const [commentsList, setCommentsList] = React.useState({});
  const [refreshComments, setRefreshComments] = React.useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const post = posts.find(post => post.slug === slug);

  const returnToBlog = () => {
    navigate('/blog');
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
                  <button>Delete post</button>
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
                            return ` - ${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
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