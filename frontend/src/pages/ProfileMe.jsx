import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const ProfileMe = () => {
  return (
    <main id="my-profile-page">
      <h1>User name</h1>
      <section className="profile-pic-container">
        <div className="profile-pic-image">
          <img src="" alt="profile-pic" />
          <div className="change-profile-pic-button"></div>
        </div>
      </section>
      <section className="my-pictures">My pictures</section>
      <section className="my-groups">My groups</section>
    </main>
  )
}

export default ProfileMe
