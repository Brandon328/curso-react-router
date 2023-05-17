import { Link, Outlet } from 'react-router-dom'
import { useApi } from './useApi'

function BlogPage() {
  const { posts } = useApi();

  return (
    <>
      <h1>BlogPage</h1>
      <ul>
        {
          posts.length > 0 ? (
            posts.map(post =>
              <li key={post.postId}>
                <Link
                  to={`/blog/${post.slug}`}
                >
                  {post.title}
                </Link>
              </li>
            )
          ) : (
            <span>loading...</span>
          )
        }
      </ul>
      <Outlet />
    </>
  )
}

export { BlogPage }