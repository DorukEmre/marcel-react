import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
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

  const categories = [
    {
      name: 'Feed',
      activeImage: feedActive,
      inactiveImage: feedInactive,
    },
    {
      name: 'Explore',
      activeImage: exploreActive,
      inactiveImage: exploreInactive,
    },
    {
      name: 'Spot',
      activeImage: spotActive,
      inactiveImage: spotInactive,
    },
    {
      name: 'Groups',
      activeImage: groupsActive,
      inactiveImage: groupsInactive,
    },
    {
      name: 'Profile',
      activeImage: profileActive,
      inactiveImage: profileInactive,
    },
  ]

  return (
    <header>
      <nav className="header-navbar">
        {isUserLoggedIn ? (
          <ul className="header-list">
            {categories.map((categ) => (
              <HeaderButton
                key={categ.name}
                url={categ.name.toLowerCase()}
                activeImageSrc={categ.activeImage}
                inactiveImageSrc={categ.inactiveImage}
                imgalt={`${categ.name} icon`}
                name={categ.name}
              />
            ))}
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
