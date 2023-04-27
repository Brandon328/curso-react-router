import { useNavigate, useParams } from "react-router-dom"
import { blogPosts } from "../assets/blogdata";

function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(post => post.slug === slug)

  const returnToBlog = () => {
    navigate('/blog');
  }
  return (
    <>
      <h1>{post.title}</h1>
      <i>{post.author}</i>
      <p>{post.content}</p>
      <button
        onClick={returnToBlog}
      >
        Volver
      </button>
    </>
  )
}

export { BlogPostPage }