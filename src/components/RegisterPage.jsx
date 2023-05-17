import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "./auth";

function RegisterPage() {
  const auth = useAuth();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');

  if (auth.user && auth.user !== 404) {
    return <Navigate to="/profile" />
  }

  const register = async (e) => {
    e.preventDefault();
    await auth.register({ username, password, firstname, lastname });
  }

  return (
    <>
      <h1>Register Page</h1>
      {
        auth.error && (
          <span>{auth.error}</span>
        )
      }
      <form onSubmit={register}>
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={e => setUsername(e.target.value)}
        /> <br /><br />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        /> <br /><br />
        <input
          type="text"
          value={firstname}
          placeholder="firstname"
          onChange={e => setFirstname(e.target.value)}
        /> <br /><br />
        <input
          type="text"
          value={lastname}
          placeholder="lastname"
          onChange={e => setLastname(e.target.value)}
        /> <br /><br />
        <button type="submit">Registrar</button>
      </form>
    </>
  )
}

export { RegisterPage }