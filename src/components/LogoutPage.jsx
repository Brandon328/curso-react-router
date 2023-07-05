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
        <label>Are you sure you want to log out?</label>
        <button type="submit">Quit</button>
      </form>
    </>
  )
}

export { LogoutPage }