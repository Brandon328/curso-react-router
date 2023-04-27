import { Link } from 'react-router-dom'
import { blogPosts } from '../assets/blogdata'

function BlogPage() {
  return (
    <>
      <h1>BlogPage</h1>
      <ul>
        {
          blogPosts.map((post, index) =>
            <li key={index}>
              <Link
                to={`/blog/${post.slug}`}
              >
                {post.title}
              </Link>
            </li>
          )
        }
      </ul>
    </>
  )
}

export { BlogPage }