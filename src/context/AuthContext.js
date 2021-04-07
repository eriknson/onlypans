import { auth, db } from '../config/firebase'

import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from 'react'
const authContext = createContext({ user: {} })
const { Provider } = authContext

export function AuthProvider(props) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const listener = auth.onAuthStateChanged((value) => {
      if (value) {
        setUser(value)
      }
    })

    return () => {
      listener()
    }
  }, [auth])

  const value = {
    setUser,
    auth,
    db,
    user,
  }
  return <Provider value={value}>{props.children}</Provider>
}

export const useAuthContext = () => {
  return useContext(authContext)
}
