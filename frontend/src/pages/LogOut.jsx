import { catMediumLogo } from '../assets/images'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import useAuth from '../hooks/useAuth'

const LOGOUT_URL = '/logout'

const LogOut = () => {
  const { setAuth } = useAuth()

  // To take the user back to where they came from after log in
  const navigate = useNavigate()

  const logoutUser = async () => {
    try {
      const response = await axios.get(LOGOUT_URL, {
        withCredentials: true,
      })
      console.log('response', response)

      setAuth({})

      // Take user back to home page
      navigate('/')
    } catch (err) {
      console.log('err', err)
    }
  }

  useEffect(() => {
    logoutUser()
  }, [])

  return (
    <main id="logout-page">
      <div className="logout-container">
        <section className="login-logo-container">
          <Link to="/">
            <img src={catMediumLogo} alt="cat logo" />
          </Link>
        </section>
        <section className="form-panel">
          <h1>See you soon!</h1>
          <p>
            <Link to="/" className="">
              Return to home page
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}

export default LogOut
