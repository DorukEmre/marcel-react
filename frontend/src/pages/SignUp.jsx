import { catMediumLogo } from '../assets/images'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <main id="signup-page">
      <div className="signup-container">
        <section className="signup-logo-container">
          <Link to="/">
            <img src={catMediumLogo} alt="cat logo" />
          </Link>
        </section>
        <section className="form-panel">
          <h1>Sign Up to Marcel</h1>
          <form action="/signup" method="POST">
            <div className="form-group">
              <label htmlFor="userName">Username (public)</label>
              <input
                type="text"
                id="userName"
                name="userName"
                placeholder="Username"
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                aria-describedby="emailHelp"
                required
              />
              <small id="emailHelp" className="">
                We will never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Password"
                required
              />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <p>
            Already have an account?{' '}
            <Link to="/login" className="">
              Log in
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}

export default SignUp
