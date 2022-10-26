import { Link, useNavigate } from 'react-router-dom'
import useLogout from '../hooks/useLogout'

const Header = () => {
  const isUserLoggedIn = false
  const logInOrSignUpPage = false

  const navigate = useNavigate()
  const logout = useLogout()

  const signOut = async () => {
    await logout()
    navigate('/')
  }

  return (
    <header>
      {logInOrSignUpPage ? (
        <></>
      ) : (
        <nav className="header-navbar">
          {isUserLoggedIn ? (
            <></>
          ) : (
            <ul className="header-list new-session">
              <li className="header-item login">
                <Link to="/feed">Feed</Link>
              </li>
              <li className="header-item login">
                <Link to="/users">Users</Link>
              </li>
              <li className="header-item login">
                <button className="logout-button" onClick={signOut}>
                  Log Out
                </button>
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
