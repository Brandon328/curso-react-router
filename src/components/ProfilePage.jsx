import { useAuth } from "./auth"

function ProfilePage() {
  const auth = useAuth();
  return (
    <>
      <h1>ProfilePage</h1>
      <p>Welcome {auth.user?.firstname} {auth.user?.lastname}</p>
      <sub>@{auth.user?.username}</sub>
      <br /><br />
      <button>Create a blog</button>
    </>
  )
}

export { ProfilePage }