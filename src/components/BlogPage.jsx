import { useEffect, useState, createContext } from 'react';
import { Link, Outlet } from 'react-router-dom'
import { API_URL } from '../assets/API_URL';

const BlogPageContext = createContext();

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(true);

  useEffect(() => {
    if (updated) {
      fetch(`${API_URL}/get-posts`)
        .then(response => response.json())
        .then(data => setPosts(data))
        .catch(error => console.log(error))
        .finally(() => setUpdated(false));
    }
  }, [updated]);

  return (
    <BlogPageContext.Provider value={{
      updated, setUpdated
    }}>
      <h1>BlogPage</h1>
      <ul>
        {
          posts.length > 0 ? (
            posts.map(post =>
              <li key={post.postId}>
                <Link
                  to={`/blog/${post.slug}`}
                  style={{ color: 'rgb(161, 161, 253)' }}
                >
                  {post.title}
                </Link> / <i style={{ color: 'rgb(161, 161, 253)' }}>@{post.username}</i>
              </li>
            )
          ) : (
            <span>loading...</span>
          )
        }
      </ul>
      <Outlet />
    </BlogPageContext.Provider>
  )
}

export { BlogPage, BlogPageContext }