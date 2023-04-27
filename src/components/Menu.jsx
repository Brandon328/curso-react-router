import { NavLink } from "react-router-dom"

function Menu() {
  return (
    <nav>
      <ul>
        {
          routes.map((route, index) =>
            <li
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
            </li>
          )
        }
      </ul>
    </nav>
  )
}

const routes = [
  {
    to: '/',
    text: 'home'
  },
  {
    to: '/blog',
    text: 'blog'
  },
  {
    to: '/profile',
    text: 'profile'
  },
]

export { Menu }