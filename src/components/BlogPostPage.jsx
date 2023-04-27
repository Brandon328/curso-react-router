import { useParams } from "react-router-dom"
import { blogPosts } from "../assets/blogdata";

function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find(post => post.slug === slug)
  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <caption>{post.author}</caption>
    </>
  )
}

export { BlogPostPage }