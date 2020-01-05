import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

export default () => {
  const auth = useContext(AuthContext)

  const handleLogout = () => {
    auth.logout()
  }

  return (
    <nav>
      <div id="navbar" className="nav-wrapper blue darken-1">
        <span className="brand-logo">CC</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create" exact>
              Создать
            </NavLink>
          </li>
          <li>
            <NavLink to="/links" exact>
              Мои ссылки
            </NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={handleLogout}>
              Выйти
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
