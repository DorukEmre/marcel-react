import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const Groups = () => {
  return (
    <article style={{ padding: '100px' }}>
      <h1>Groups page</h1>
      <div className="">
        <Link to="/">Visit Our Homepage</Link>
      </div>
    </article>
  )
}

export default Groups
