import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import useHttp from '../hooks/http.hook'
import AuthContext from '../context/AuthContext'

export default () => {
  const auth = useContext(AuthContext)
  const history = useHistory()
  const { request } = useHttp()
  const [link, setLink] = useState('')

  useEffect(() => {
    if (window.M) {
      window.M.updateTextFields() // makes inputs active
    }
  }, [])

  const handleGenerate = async () => {
    try {
      const data = await request(
        '/api/links/generate',
        'POST',
        { from: link },
        {
          Authorization: `Bearer ${auth.token}`
        }
      )
      history.push(`/detail/${data.link._id}`)
    } catch (e) {}
  }

  const handleChange = event => setLink(event.target.value)
  const handlePress = event => event.key === 'Enter' && handleGenerate()

  return (
    <div id="create-page" className="row">
      <div className="col s8 offset-s2">
        <div className="input-field">
          <input
            type="text"
            id="link"
            placeholder="Вставьте ссылку"
            value={link}
            onChange={handleChange}
            onKeyPress={handlePress}
          />
          <label htmlFor="link">Вставьте ссылку</label>
        </div>
        <button className="btn yellow darken-4" onClick={handleGenerate}>
          Сгенерировать
        </button>
      </div>
    </div>
  )
}
