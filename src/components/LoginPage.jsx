import React from "react";
import { useAuth } from "./auth"
import { Navigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = React.useState('')
  const auth = useAuth();

  const login = e => {
    e.preventDefault();
    auth.login(username);
  }

  if (auth.user) {
    return <Navigate to="/profile" />
  }

  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={login}>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </>
  )
}

export { LoginPage }