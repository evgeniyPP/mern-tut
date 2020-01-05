import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  Fragment
} from 'react'
import { useParams } from 'react-router-dom'
import useHttp from '../hooks/http.hook'
import AuthContext from '../context/AuthContext'
import Preloader from '../components/Preloader'
import LinkCard from '../components/LinkCard'

export default () => {
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [link, setLink] = useState(null)
  const linkId = useParams().id

  const getLink = useCallback(async () => {
    try {
      const data = await request(`/api/links/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLink(data)
    } catch (e) {}
  }, [token, linkId, request])

  useEffect(() => {
    getLink()
  }, [getLink])

  if (loading) {
    return <Preloader />
  }

  return <Fragment>{!loading && link && <LinkCard link={link} />}</Fragment>
}
