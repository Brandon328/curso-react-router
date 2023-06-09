import { NavLink } from "react-router-dom"
import { useAuth } from "./auth"

function Menu() {
  const auth = useAuth();
  const routes = [
    {
      to: '/',
      text: 'home',
      private: false
    },
    {
      to: '/blog',
      text: 'blog',
      private: false
    },
    {
      to: `/profile/${auth.user?.username.toLowerCase()}`,
      text: 'profile',
      private: true
    },
    {
      to: '/login',
      text: 'login',
      private: false
    },
    {
      to: '/logout',
      text: 'logout',
      private: true
    },
    {
      to: '/register',
      text: 'register',
      private: false
    }
  ]

  return (
    <nav>
      <ul>
        {
          routes.map((route, index) => {
            if (route.private && !auth.user) return null;
            if (route.text === 'login' && auth.user) return null;
            if (route.text === 'register' && auth.user) return null;

            return (
              <li key={index}>
                <NavLink
                  style={({ isActive }) => ({
                    color: isActive ? 'red' : 'rgb(161, 161, 253) '
                  })}
                  to={route.to}
                >
                  {route.text}
                </NavLink>
              </li>
            )
          })
        }
      </ul>
    </nav>
  )
}

export { Menu }