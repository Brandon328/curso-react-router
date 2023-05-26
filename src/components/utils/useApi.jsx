import React from 'react'

function useApi() {
  const API_URL = 'http://localhost:9000/api'
  const [posts, setPosts] = React.useState([]);

  const getPosts = () => {
    fetchData(`${API_URL}/get-posts`)
      .then(data => setPosts(data));
  }

  React.useEffect(() => {
    getPosts();
  }, []);

  return {
    posts,
    getPosts
  }
}

async function fetchData(API_URL) {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

function slugify(text) {
  const normalizedText = text
    .toString()
    .toLowerCase()
    .normalize("NFD") // Normalizar caracteres Unicode
    .replace(/[\u0300-\u036f]/g, "") // Eliminar diacríticos (vocales con tilde)
    .replace(/ñ/g, "n"); // Reemplazar "ñ" por "n"

  return normalizedText
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}


export { useApi, fetchData, slugify }