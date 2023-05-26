import React from "react";
import { useAuth } from "./auth"

function LoginPage() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const auth = useAuth();

  const login = e => {
    e.preventDefault();
    auth.login(username, password);
  }

  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={login}>
        {
          (auth.error) && (
            <>
              <b style={{ color: 'red' }}>{auth.error}</b>
              <br /><br />
            </>
          )
        }
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
        <button type="submit">Entrar</button>
      </form>
    </>
  )
}

export { LoginPage }