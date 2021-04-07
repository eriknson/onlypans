import { useAuthContext } from '../src/context/AuthContext'

export default function DashBoardPage(props) {
  const auth = useAuthContext()
  if (!auth.user) return <h1>auth.user = false</h1>
  return (
    <div>
      <h2>{`Welcome ${auth.user.name}!`}</h2>
      <p>{`You are logged in with ${auth.user.email}`}</p>
    </div>
  )
}