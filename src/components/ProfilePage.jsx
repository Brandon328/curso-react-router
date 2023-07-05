import { useEffect, useState } from "react";
import { useAuth } from "./auth"
import { NavLink, Outlet, useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { API_URL } from '../assets/API_URL';

function ProfilePage() {
  const auth = useAuth();
  const location = useLocation();
  const { username } = useParams();
  const [searchedUser, setSearchedUser] = useState();
  const [posts, setPosts] = useState({});
  const currUsername = auth.user?.username;

  // Verificar si el username existe o no
  useEffect(() => {
    fetch(`${API_URL}/get-user/${username}`)
      .then(response => response.json())
      .then(data => {
        setSearchedUser(data);
        if (data.length > 0)
          fetch(`${API_URL}/get-user-posts/${username}`)
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }, [location]);

  return (
    <>
      {
        !searchedUser ?
          <p>Loading..</p>
          :
          (
            searchedUser.length > 0 ?
              <>
                {
                  username.toLowerCase() == currUsername.toLowerCase() ?
                    <>
                      <h1>ProfilePage</h1>
                      <p>Welcome {auth.user?.firstname} {auth.user?.lastname}</p>
                      <sub>@{auth.user?.username}</sub>
                      <br /><br />

                      {
                        location.hash != (`#/profile/${auth.user?.username}/create-post`) && (
                          <button>
                            <NavLink
                              to={`/profile/${auth.user?.username}/create-post`}
                              style={{ textDecoration: 'none', color: 'white' }}
                            >
                              Create a post
                            </NavLink>
                          </button>
                        )
                      }

                      <h3>Your posts</h3>
                      <Outlet />
                    </>
                    :
                    <>
                      <h1>@{username}</h1>
                    </>
                }
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
              </>
              :
              <p>We&apos;re sorry, user @{username} doesn&apos;t exist</p>
          )
      }
    </>
  )
}

export { ProfilePage }