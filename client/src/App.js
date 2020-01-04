import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AuthContext from './context/AuthContext'
import useRoutes from './routes'
import useAuth from './hooks/auth.hook'
import Navbar from './components/Navbar'
import 'materialize-css'

export default () => {
  const { token, userId, login, logout } = useAuth()
  const isAuthed = !!token
  const routes = useRoutes(isAuthed)
  return (
    <AuthContext.Provider value={{ token, userId, login, logout, isAuthed }}>
      <Router>
        {isAuthed && <Navbar />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  )
}
