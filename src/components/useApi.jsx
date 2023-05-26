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


export { useApi, fetchData }