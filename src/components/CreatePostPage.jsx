import React from 'react';
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from './auth';
import { slugify } from './useApi';

function CreatePostPage() {
  const [content, setContent] = React.useState('');
  const [title, setTitle] = React.useState('');

  const auth = useAuth();
  const navigate = useNavigate();

  const createPost = async e => {
    e.preventDefault();
    const slug = slugify(title);
    const data = {
      title,
      slug,
      content,
      userId: auth.user.userId
    }
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data)
    }

    const response = await fetch('http://localhost:9000/api/create-post', options);
    if (response.status === 200) {
      setContent('');
      setTitle('');
      navigate('/blog');
    }
  }

  return (
    <>
      <h2>Create a post</h2>
      <form onSubmit={createPost}>
        <div>
          <input
            type="text"
            placeholder="Type a title for this post"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <br /><br />
        </div>
        <div>
          <textarea
            placeholder="Type something"
            defaultValue={content}
            onChange={e => setContent(e.target.value)}
            rows="10"
            cols="50"></textarea>
        </div>
        <input type="submit" value="Post" />
        <button>
          <NavLink
            to="/profile"
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Cancel
          </NavLink>
        </button>
      </form>
    </>
  )
}

export { CreatePostPage }