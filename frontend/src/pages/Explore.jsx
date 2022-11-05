import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Map from '../components/Map'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const Explore = () => {
  return (
    <main id="feed-page">
      <h1>Explore page</h1>
      <Map />
    </main>
  )
}

export default Explore
