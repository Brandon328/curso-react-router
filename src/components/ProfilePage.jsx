import { useAuth } from "./auth"

function ProfilePage() {
  const auth = useAuth();
  return (
    <>
      <h1>ProfilePage</h1>
      <p>Welcome {auth.user?.username}</p>
      <button>Create a blog</button>
    </>
  )
}

export { ProfilePage }