import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'

const createUser = (db, user) => {
  return db.collection('users').doc(user.uid).set(user)
}

const useCreateUser = () => {
  const { auth, db, setUser } = useAuthContext()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState()

  const signUp = ({ name, email, password }) => {
    setLoading(true)
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (response) => {
        auth.currentUser.sendEmailVerification()
        const user = {
          uid: response.user.uid,
          email,
          name,
        }

        await createUser(db, user)
        console.log(user)
        setLoading(false)
        setSuccess(true)
      })
      .catch((error) => {
        setLoading(false)
        setSuccess(false)
        setError(error.message)
      })
  }

  return [signUp, { loading, error, success }]
}

export default useCreateUser
