import { useAuth } from "./auth"
import { NavLink, Outlet } from "react-router-dom";

function ProfilePage() {
  const auth = useAuth();

  return (
    <>
      <h1>ProfilePage</h1>
      <p>Welcome {auth.user?.firstname} {auth.user?.lastname}</p>
      <sub>@{auth.user?.username}</sub>
      <br /><br />
      {
        location.hash != '#/profile/create-post' && (
          <button>
            <NavLink
              to="/profile/create-post"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Create a post
            </NavLink>
          </button>
        )
      }
      <Outlet />
    </>
  )
}

export { ProfilePage }