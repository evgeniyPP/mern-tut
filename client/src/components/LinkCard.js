import React from 'react'

export default ({ link }) => {
  return (
    <div>
      <h2>Ваша ссылка</h2>
      <p>
        Было:{' '}
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>
      <p>
        Стало:{' '}
        <a href={link.to} target="_blank" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>
      <p>
        Количество переходов по ссылке: <strong>{link.clicks}</strong>
      </p>
      <p>
        Дата создания:{' '}
        <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </div>
  )
}
