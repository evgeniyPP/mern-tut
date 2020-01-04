import React, { useState, useEffect, useContext } from 'react'
import useHttp from '../hooks/http.hook'
import useMessage from '../hooks/message.hook'
import AuthContext from '../context/AuthContext'

export default () => {
  const auth = useContext(AuthContext)
  const { loading, error, request, clearError } = useHttp()
  const message = useMessage()
  const [form, setForm] = useState({ email: '', password: '' })

  useEffect(() => {
    if (window.M) {
      window.M.updateTextFields() // makes inputs active
    }
  }, [])

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const clearForm = () => setForm({ email: '', password: '' })

  const handleSignUp = async () => {
    try {
      const data = await request('/api/auth/signup', 'POST', { ...form })
      message(data.message)
      clearForm()
    } catch (e) {}
  }

  const handleLogin = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
      clearForm()
    } catch (e) {}
  }

  return (
    <div className="row auth-page">
      <div className="col s6 offset-s3">
        <h2>Сократи ссылку</h2>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Введите e-mail"
                  value={form.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">E-mail</label>
              </div>
              <div className="input-field">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Введите пароль"
                  value={form.password}
                  onChange={handleChange}
                />
                <label htmlFor="password">Пароль</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              onClick={handleLogin}
              disabled={loading}
            >
              Войти
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={handleSignUp}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
