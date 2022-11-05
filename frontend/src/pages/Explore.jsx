import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Map from '../components/Map'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const Explore = () => {
  const axiosPrivate = useAxiosPrivate()
  const [catsWithLocation, setCatsWithLocation] = useState([])
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

        isMounted && setCatsWithLocation(response.data.catsWithLocation)
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
    <main id="feed-page">
      <h1>Explore page</h1>
      {!loading ? (
        <Map catsWithLocation={catsWithLocation} />
      ) : (
        'Fetching data...'
      )}
    </main>
  )
}

export default Explore
