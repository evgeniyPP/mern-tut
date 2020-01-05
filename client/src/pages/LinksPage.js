import React, {
  useState,
  useContext,
  useCallback,
  Fragment,
  useEffect
} from 'react'
import useHttp from '../hooks/http.hook'
import AuthContext from '../context/AuthContext'
import Preloader from '../components/Preloader'
import LinksList from '../components/LinksList'

export default () => {
  const [links, setLinks] = useState([])
  const { request, loading } = useHttp()
  const { token } = useContext(AuthContext)

  const getLinks = useCallback(async () => {
    try {
      const data = await request('/api/links', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLinks(data)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    getLinks()
  }, [getLinks])

  if (loading) {
    return <Preloader />
  }

  return <Fragment>{!loading && links && <LinksList links={links} />}</Fragment>
}
