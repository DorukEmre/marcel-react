import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import {
  closeIcon,
  commentIcon,
  likeFalseIcon,
  likeTrueIcon,
  sendMessageIcon,
} from '../assets/icons'

const Spot = () => {
  return (
    <article style={{ padding: '100px' }}>
      <h1>Spot page</h1>
      <div className="">
        <Link to="/">Visit Our Homepage</Link>
      </div>
    </article>
  )
}

export default Spot
