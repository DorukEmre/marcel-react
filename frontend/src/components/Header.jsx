import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useLogout from '../hooks/useLogout'
import useAuth from '../hooks/useAuth'
import HeaderButton from './HeaderButton'
import {
  feedActive,
  feedInactive,
  exploreActive,
  exploreInactive,
  groupsActive,
  groupsInactive,
  spotActive,
  spotInactive,
  profileActive,
  profileInactive,
} from '../assets/nav_icons'

const Header = () => {
  const { auth } = useAuth()
  const isUserLoggedIn = auth?.accessToken

  const navigate = useNavigate()
  const logout = useLogout()

  const signOut = async () => {
    await logout()
    navigate('/')
  }
  const [categories, setCategories] = useState([
    {
      name: 'Feed',
      active: true,
      activeImage: feedActive,
      inactiveImage: feedInactive,
    },
    {
      name: 'Explore',
      active: false,
      activeImage: exploreActive,
      inactiveImage: exploreInactive,
    },
    {
      name: 'Spot',
      active: false,
      activeImage: spotActive,
      inactiveImage: spotInactive,
    },
    {
      name: 'Groups',
      active: false,
      activeImage: groupsActive,
      inactiveImage: groupsInactive,
    },
    {
      name: 'Profile',
      active: false,
      activeImage: profileActive,
      inactiveImage: profileInactive,
    },
  ])

  function becomeActive(e) {
    const li = e.target.closest('.header-item')

    setCategories((prevCategories) =>
      prevCategories.map((categ) => {
        if (li.classList[0] === categ.name) {
          return { ...categ, active: true }
        } else {
          return { ...categ, active: false }
        }
      }),
    )
  }

  return (
    <header>
      <nav className="header-navbar">
        {isUserLoggedIn ? (
          <ul className="header-list">
            {categories.map((categ) => (
              <HeaderButton
                key={categ.name}
                url={categ.name.toLowerCase()}
                isActive={categ.active ? 'active' : ''}
                imgsrc={categ.active ? categ.activeImage : categ.inactiveImage}
                imgalt={`${categ.name} icon`}
                name={categ.name}
                handleClick={becomeActive}
              />
            ))}
            <li className="header-item">
              <Link to="/users">Users</Link>
            </li>
            <li className="header-item logout">
              <button className="logout-link" onClick={signOut}>
                Log Out
              </button>
            </li>
          </ul>
        ) : (
          <ul className="header-list new-session">
            <li className="header-item login">
              <Link to="/login">Log in</Link>
            </li>
            <li className="header-item signup">
              <Link to="/signup">Sign up</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  )
}

export default Header
