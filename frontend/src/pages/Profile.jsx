import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import useLogout from '../hooks/useLogout'

const Profile = () => {
  const logout = useLogout()
  const navigate = useNavigate()

  const signOut = async () => {
    await logout()
    navigate('/')
  }

  return (
    <article style={{ padding: '100px' }}>
      <h1>Profile page</h1>
      <div className="logout">
        <button className="logout-link" onClick={signOut}>
          Log Out
        </button>
      </div>
    </article>
  )
}

export default Profile
