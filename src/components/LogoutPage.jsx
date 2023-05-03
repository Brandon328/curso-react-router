import { useAuth } from "./auth"

function LogoutPage() {
  const auth = useAuth();
  const logout = e => {
    e.preventDefault();
    auth.logout();
  }
  return (
    <>
      <h1>Logout Page</h1>
      <form onSubmit={logout}>
        <label>¿Seguro que quieres salir?</label>
        <button type="submit">Salir</button>
      </form>
    </>
  )
}

export { LogoutPage }