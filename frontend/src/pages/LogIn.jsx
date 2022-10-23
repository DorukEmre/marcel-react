import { catMediumLogo } from '../assets/images'
import { Link } from 'react-router-dom'

const LogIn = () => {
  return (
    <main id="login-page">
      <div className="login-container">
        <section className="login-logo-container">
          <Link to="/">
            <img src={catMediumLogo} alt="cat logo" />
          </Link>
        </section>
        <section className="form-panel">
          <h1>Log in to Marcel</h1>
          <form action="/login" method="POST">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                placeholder="Email"
                type="text"
                id="email"
                aria-describedby="emailHelp"
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                placeholder="Password"
                type="password"
                id="password"
                required
              />
            </div>
            <button type="submit">Log In</button>
          </form>
          <p>
            New to Marcel?{' '}
            <Link to="/signup" className="">
              Sign up
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}

export default LogIn
