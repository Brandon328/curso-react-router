# Curso de React Router DOM

[Con react-router-dom](https://reactrouter.com/en/main) podemos crear HashRouters y BrowserRouters.

## Tabla de contenido

- [Curso de React Router DOM](#curso-de-react-router-dom)
  - [Tabla de contenido](#tabla-de-contenido)
  - [Usage](#usage)
  - [HashRouter](#hashrouter)
    - [Implementación](#implementación)
  - [useParams](#useparams)
  - [useNavigate](#usenavigate)
  - [BrowserRouter](#browserrouter)

## Usage
Corre los siguientes comandos para iniciar la aplicación.
```bash
cd curso-react-router
npm start
```


## HashRouter

Ideal para SPA, pues no se hace una petición al servidor por cada cambio en la ruta.

`/#/ejemplo`

### Implementación

```javascript
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Menu } from './components/Menu'
import { HomePage } from './components/HomePage'
import { BlogPage } from './components/BlogPage'
import { ProfilePage } from './components/ProfilePage'

function App() {
  return (
    <>
      <HashRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
```

* **Menu Component**
  
  Para agregar las opciones del menú de navegación podemos usar los componentes `Link` o `NavLink` de react-router-dom. En el siguiente ejemplo se usa el componente `NavLink`.

  ```javascript
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
  ```

  La implementación de las rutas usando el componente `Link` es bastante similar, con la excepción de que su propiedad `style` ya no recibe una función, por lo tanto ya no podemos hacer uso de `isActive`.

## useParams

Hook del paquete react-router-dom para obtener parametros de la ruta de navegación. Se usa de la siguiente manera:

```javascript
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </HashRouter>
  )
}

//

import { useParams } from "react-router-dom"

function BlogPostPage() {
  const { slug } = useParams();
  ...
}

```

## useNavigate

Es un hook que nos permite navegar entre las rutas anteriormente visitadas.

```javascript
import { useNavigate } from "react-router-dom"

function BlogPostPage() {
  const navigate = useNavigate();

  const returnToBlog = () => {
    navigate('/blog');
  }
  return (
    <button
      onClick={returnToBlog}
    >
      Volver
    </button>
  )
}
```


## BrowserRouter

