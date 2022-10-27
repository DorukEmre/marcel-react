import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const Profile = () => {
  return (
    <article style={{ padding: '100px' }}>
      <h1>Profile page</h1>
      <div className="">
        <Link to="/">Visit Our Homepage</Link>
      </div>
    </article>
  )
}

export default Profile
