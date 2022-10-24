import { catMediumLogo } from '../assets/images'
import { Link } from 'react-router-dom'
import { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import axios from 'axios'

const LOGIN_URL = '/login'

const LogIn = () => {
  const { setAuth } = useContext(AuthContext)
  const emailRef = useRef()
  const errRef = useRef()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      console.log(email, password)
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          // withCredentials: true,
        },
      )
      // console.log(response.data)
      const accessToken = response?.data?.accessToken

      setAuth({ email, password, accessToken })

      setEmail('')
      setPassword('')
      setSuccess(true)
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Email or Password')
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Login Failed')
      }
      errRef.current.focus()
    }
  }

  return (
    <main id="login-page">
      <div className="login-container">
        <section className="login-logo-container">
          <Link to="/">
            <img src={catMediumLogo} alt="cat logo" />
          </Link>
        </section>
        {success ? (
          <section>
            <h1>You are logged in!</h1>
            <br />
            <p>
              <a href="#">Go to Home</a>
            </p>
          </section>
        ) : (
          <section className="form-panel">
            <h1>Log in to Marcel</h1>
            <p
              ref={errRef}
              className={errMsg ? 'errmsg' : 'offscreen'}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  ref={emailRef}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  value={email}
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>
              <button>Log In</button>
            </form>
            <p>
              New to Marcel?{' '}
              <Link to="/signup" className="">
                Sign up
              </Link>
            </p>
          </section>
        )}
      </div>
    </main>
  )
}

export default LogIn
