import React from 'react'
import { createPortal } from 'react-dom';
import { useAuth } from "./auth";
import { useParams, useNavigate } from "react-router-dom";
import { ModalContent } from './ModalContent';
import { slugify } from './utils/useApi';

function EditPostPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { postId } = useParams();

  const [post, setPost] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  const [error, setError] = React.useState('');

  const updatePost = async e => {
    e.preventDefault();
    const slug = slugify(title)
    const data = {
      title,
      content,
      slug
    }
    const options = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data)
    }

    const response = await fetch(`http://localhost:9000/api/update-post/${postId}`, options);
    if (response.status === 200) {
      setError(null);
      navigate(`/blog/${slug}`);
    }
    else {
      setError('Ocurrio un error con la API');
      console.log(error);
    }
  }


  React.useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:9000/api/get-post/${postId}/${auth.user.userId}`)
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        if (data.length === 0) {
          navigate("/profile");
        }
        setPost(data);
        setTitle(data[0].title);
        setContent(data[0].content);
      });
  }, [auth, postId]);

  return (
    <>
      <h1>EditPost Page</h1>
      {
        showModal && createPortal(
          <ModalContent
            message="Are sure you want to cancel? Your changes will not be saved"
            onClose={() => setShowModal(false)}
            onYes={() => navigate(`/blog/${post[0].slug}`)}
          />,
          document.body
        )
      }
      {
        loading ? (
          <span>Loading...</span>
        ) : (
          <>
            <form onSubmit={updatePost}>
              <input
                type="text"
                value={title}
                style={{
                  width: '380px'
                }}
                onChange={e => setTitle(e.target.value)} /><br /> <br />
              <textarea
                rows={15}
                cols={50}
                defaultValue={content}
                onChange={e => setContent(e.target.value)}
              ></textarea><br /><br />
              <button type="submit">
                Save
              </button>
              <button
                onClick={() => setShowModal(true)}>
                Cancel
              </button>
            </form>
          </>
        )
      }
    </>
  );
}
export { EditPostPage }