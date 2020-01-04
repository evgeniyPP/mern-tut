import { createContext } from 'react'

const AuthContext = createContext({
  token: null,
  userId: null,
  login: null,
  logout: null,
  isAuthed: false
})

export default AuthContext
