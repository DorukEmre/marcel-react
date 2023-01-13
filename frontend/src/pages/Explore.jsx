import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Map from '../components/Map'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import useAuth from '../hooks/useAuth'

const Explore = () => {
  const { auth } = useAuth()
  // console.log('auth on Explore', auth)
  const currentUserId = auth.userId

  const axiosPrivate = useAxiosPrivate()
  const [posts, setPosts] = useState([])
  const [GMKey, setGMKey] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const fetchCatLocations = async () => {
      try {
        setLoading(true)
        const response = await axiosPrivate.get('/api/explore', {
          signal: controller.signal,
        })
        // console.log(response.data)

        isMounted && setPosts(response.data.posts)
        isMounted && setGMKey(response.data.GMKey)
        setLoading(false)
      } catch (err) {
        console.error('Login again err', err)
        if (!err?.response) {
          console.log('No Server Response')
        } else if (err.response?.status === 403) {
          navigate('/login', { state: { from: location }, replace: true })
        } else {
          console.log('Request failed')
        }
      }
    }
    fetchCatLocations()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return (
    <main id="explore-page">
      {!loading ? (
        <Map
          posts={posts}
          setPosts={setPosts}
          currentUserId={currentUserId}
          GMKey={GMKey}
        />
      ) : (
        <div className="tracking">Tracking neighbourhood cats...</div>
      )}
    </main>
  )
}

export default Explore
