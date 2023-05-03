import { HashRouter, Routes, Route } from 'react-router-dom'
import { Menu } from './components/Menu'
import { HomePage } from './components/HomePage'
import { BlogPage } from './components/BlogPage'
import { ProfilePage } from './components/ProfilePage'
import { BlogPostPage } from './components/BlogPostPage'
import { LoginPage } from './components/LoginPage'
import { LogoutPage } from './components/LogoutPage'
import { AuthProvider } from './components/auth'

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Menu />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />}>
            <Route path=":slug" element={<BlogPostPage />} />
          </Route>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  )
}

export default App
