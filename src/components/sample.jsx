import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "./auth";
import { useApi } from "./useApi";
import { LikePostButton } from "./LIkePostButton";
import { CommentPostButton } from "./CommentPostButton";
// import React from "react";

async function BlogPostPage() {
  const { slug } = useParams();
  const { posts } = useApi();
  const auth = useAuth();
  const post = posts.find(post => post.slug === slug);
  // const [commentsList, setCommentsList] = React.useState({});
  const navigate = useNavigate();

  // React.useEffect(() => {
  //   fetch(`http://localhost:9000/api/get-comments/${post.postId}`)
  //     .then(response => response.json())
  //     .then(data => setCommentsList(data));
  //   console.log(commentsList)
  // }, [])

  const returnToBlog = () => {
    navigate('/blog');
  }

  return (
    <>
      {
        post ? (
          <>
            <h1>{post.title}</h1>
            <i>{post.username}</i>
            <p>{post.content}</p>
            <p>
              <button
                onClick={returnToBlog}
              >
                Volver
              </button>
            </p>
            {
              post?.username === auth.user?.username && (
                <div>
                  <button>Delete post</button>
                  <button>Edit post</button>
                </div>
              )
            }
            {
              auth.user && (
                <>
                  <LikePostButton postId={post.postId} />
                  <CommentPostButton postId={post.postId} />
                </>
              )
            }
            {/* {
              commentsList.length > 0 ? (
                commentsList.map((comment, key) =>
                  <div key={key}>
                    <br />
                    <p>
                      <i>@{comment.username}</i>
                    </p>
                    <p>
                      {comment.content}
                    </p>
                    <sub>{comment.date}</sub>
                    <br />
                  </div>
                )
              ) : (
                <p>There are no comments yet</p>
              )
            } */}
          </>
        ) : (
          <span>loading...</span>
        )
      }

    </>
  )
}

export { BlogPostPage }