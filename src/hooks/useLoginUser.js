import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'

const useLoginUser = () => {
  const { auth, db, setUser } = useAuthContext()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState()

  const login = ({ email, password }) => {
    if (loading) return

    setLoading(true)
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setSuccess(true)
        setUser(response.user)
        setLoading(false)
      })
      .catch((error) => {
        setError(error.message)
        setSuccess(false)
        setLoading(false)
      })
  }

  return [login, { loading, error, success }]
}

export default useLoginUser
