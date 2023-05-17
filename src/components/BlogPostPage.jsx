import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "./auth";
import { useApi } from "./useApi";

function BlogPostPage() {
  const { slug } = useParams();
  const { posts } = useApi();
  const { user } = useAuth();

  const navigate = useNavigate();
  const post = posts.find(post => post.slug === slug)

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
            <button>Like post</button>
            <button>Comment post</button>
            {
              post?.username === user?.username && (
                <>
                  <button>Delete post</button>
                  <button>Edit post</button>
                </>
              )
            }
          </>
        ) : (
          <span>loading...</span>
        )
      }

      <button
        onClick={returnToBlog}
      >
        Volver
      </button>

    </>
  )
}

export { BlogPostPage }