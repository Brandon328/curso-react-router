import { useNavigate, useParams } from "react-router-dom"
// import { blogPosts } from "../assets/blogdata";
import { useAuth } from "./auth";
import { useApi } from "./useApi";

function BlogPostPage() {
  const { slug } = useParams();
  const { posts } = useApi();

  const navigate = useNavigate();
  const post = posts.find(post => post.slug === slug)
  const auth = useAuth();
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
            {
              (auth.user?.permissions.includes('delete') || auth.user?.username === post.author)
              && (<button>Delete post</button>)
            }
            {
              (auth.user?.permissions.includes('edit') || auth.user?.username === post.author)
              && (<button>Edit post</button>)
            }
            {
              auth.user?.permissions.includes('comment')
              && (<button>Comment post</button>)
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