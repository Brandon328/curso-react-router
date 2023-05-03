import { NavLink } from "react-router-dom"
import { useAuth } from "./auth"

function Menu() {
  const auth = useAuth();

  return (
    <nav>
      <ul>
        {
          routes.map((route, index) => {
            if (route.private && !auth.user) return null;
            if (route.text === 'login' && auth.user) return null;
            return (<li
              key={index}
            >
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? 'red' : 'blue'
                })}
                to={route.to}
              >
                {route.text}
              </NavLink>
            </li>)
          })
        }
      </ul>
    </nav>
  )
}

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
    to: '/profile',
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
]

export { Menu }