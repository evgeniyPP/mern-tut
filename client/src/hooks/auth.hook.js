import { useState, useCallback, useEffect } from 'react'

const STORAGE_NAME = 'mern-tut/userData'

const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)

  const login = useCallback((tokenFromBackend, userIdFromBackend) => {
    setToken(tokenFromBackend)
    setUserId(userIdFromBackend)
    localStorage.setItem(
      STORAGE_NAME,
      JSON.stringify({ token: tokenFromBackend, userId: userIdFromBackend })
    )
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(STORAGE_NAME)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_NAME))

    if (data && data.token) {
      login(data.token, data.userId)
    }
  }, [login])

  return { token, userId, login, logout }
}

export default useAuth
