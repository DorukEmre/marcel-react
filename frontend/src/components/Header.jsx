import { Link } from 'react-router-dom'

const Header = () => {
  const userLoggedIn = false
  const logInAndSignUp = false

  return (
    <header>
      {logInAndSignUp ? (
        <></>
      ) : (
        <nav className="header-navbar">
          {userLoggedIn ? (
            <></>
          ) : (
            <ul className="header-list new-session">
              <li className="header-item login">
                <Link to="/feed">Feed</Link>
              </li>
              <li className="header-item login">
                <Link to="/login">Log in</Link>
              </li>
              <li className="header-item signup">
                <Link to="/signup">Sign up</Link>
              </li>
            </ul>
          )}
        </nav>
      )}
    </header>
  )
}

export default Header
