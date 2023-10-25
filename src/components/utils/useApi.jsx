import { useState, useEffect } from 'react'

function useApi(url, options = {
  method: 'GET'
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url, options)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return {
    data,
    loading,
    error
  };
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

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''));
  return JSON.parse(jsonPayload);
}

export { useApi, slugify, parseJwt }