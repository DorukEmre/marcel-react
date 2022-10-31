import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const Explore = () => {
  return (
    <article style={{ padding: '100px' }}>
      <h1>Explore page</h1>
      <div className="">
        <Link to="/">Visit Our Homepage</Link>
        <br />
      </div>
    </article>
  )
}

export default Explore
