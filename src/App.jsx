import { HashRouter, Routes, Route } from 'react-router-dom'
import { Menu } from './components/Menu'
import { HomePage } from './components/HomePage'
import { BlogPage } from './components/BlogPage'
import { ProfilePage } from './components/ProfilePage'
import { BlogPostPage } from './components/BlogPostPage'

function App() {
  return (
    <HashRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </HashRouter>
  )
}

export default App
