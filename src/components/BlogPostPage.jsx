import { useNavigate, useParams } from "react-router-dom"
import { blogPosts } from "../assets/blogdata";
import { useAuth } from "./auth";

function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(post => post.slug === slug)
  const auth = useAuth();
  const returnToBlog = () => {
    navigate('/blog');
  }
  return (
    <>
      <h1>{post.title}</h1>
      <i>{post.author}</i>
      <p>{post.content}</p>
      {
        (auth.user && (auth.user?.username !== post.author))
        && (<button>Like post</button>)
      }
      {
        (auth.user?.roles.includes('admin') || auth.user?.username === post.author)
        && (<button>Delete post</button>)
      }
      {
        (auth.user?.roles.includes('editor') || auth.user?.username === post.author)
        && (<button>Edit post</button>)
      }
      {
        auth.user?.roles.includes('teacher')
        && (<button>Comment post</button>)
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