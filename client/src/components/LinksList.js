import React from 'react'
import { Link } from 'react-router-dom'

export default ({ links }) => {
  if (!links.length) {
    return <p className="center">У Вас нет ссылок, создайте одну!</p>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Было</th>
          <th>Стало</th>
          <th>Подробнее</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => (
          <tr key={link._id}>
            <td>{index + 1}</td>
            <td>
              <a href={link.from} target="_blank" rel="noopener noreferrer">
                {link.from}
              </a>
            </td>
            <td>
              <a href={link.to} target="_blank" rel="noopener noreferrer">
                {link.to}
              </a>
            </td>
            <td>
              <Link to={`/detail/${link._id}`}>Подробнее</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
