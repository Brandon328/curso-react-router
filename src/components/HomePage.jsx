import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from './auth';
import { API_URL } from '../assets/API_URL';

function HomePage() {
  const { user } = useAuth();
  const [authorUsername, setAuthorUsername] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);
  const [posts, setPosts] = useState({});

  const search = async e => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/get-user/${authorUsername}`);
    const data = await response.json();

    setSearchedUser(data);

    if (data.length > 0) {
      const response = await fetch(`${API_URL}/get-user-posts/${authorUsername}`);
      const data = await response.json();
      setPosts(data);
    }
  }

  return (
    <>
      <h1>HomePage</h1>
      <p>Search an author</p>
      <form onSubmit={search}>
        <input
          type="text"
          placeholder="Type username"
          value={authorUsername}
          onChange={e => setAuthorUsername(e.target.value)}
        />
        <input
          value="Search"
          type="submit" />
      </form>
      {
        searchedUser && (
          searchedUser.length > 0 ?
            <>
              <h1>@{authorUsername}</h1>
              {
                posts.length > 0 ?
                  <>
                    <ul>
                      {
                        posts.map(post =>
                          <li key={post.postId}>
                            <Link
                              to={`/blog/${post.slug}`}
                              style={{ color: 'rgb(161, 161, 253)' }}
                            >
                              {post.title}
                            </Link>
                          </li>
                        )
                      }
                    </ul>
                  </>
                  :
                  <p>No recent posts</p>
              }
              {
                (user && user.username == authorUsername) && (
                  <Navigate to={`/profile/${user.username}`} />
                )
              }
            </>
            :
            <p>We&apos;re sorry, user @{authorUsername} doesn&apos;t exist</p>
        )
      }
    </>
  )
}

export { HomePage }