import { HashRouter, Routes, Route } from 'react-router-dom'
import { Menu } from './components/Menu'
import { HomePage } from './components/HomePage'
import { BlogPage } from './components/BlogPage'
import { ProfilePage } from './components/ProfilePage'
import { BlogPostPage } from './components/BlogPostPage'
import { LoginPage } from './components/LoginPage'
import { LogoutPage } from './components/LogoutPage'
import { AuthProvider } from './components/auth'
import { AuthRoute, NoAuthRoute } from './components/auth'
import { RegisterPage } from './components/RegisterPage'
import { CreatePostPage } from './components/CreatePostPage'
import { EditPostPage } from './components/EditPostPage'

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
          <Route path="/edit-post/:postId" element={
            <AuthRoute>
              <EditPostPage />
            </AuthRoute>
          } />
          <Route
            path="/profile"
            element={
              <AuthRoute>
                <ProfilePage />
              </AuthRoute>
            }>
            <Route
              path="create-post"
              element={
                <AuthRoute>
                  <CreatePostPage />
                </AuthRoute>
              } />
          </Route>
          <Route path="/login"
            element={
              <NoAuthRoute>
                <LoginPage />
              </NoAuthRoute>
            } />
          <Route
            path="/register"
            element={
              <NoAuthRoute>
                <RegisterPage />
              </NoAuthRoute>
            } />
          <Route
            path="/logout"
            element={
              <AuthRoute>
                <LogoutPage />
              </AuthRoute>
            } />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  )
}

export default App
