import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const Users = () => {
  const [users, setUsers] = useState()
  const axiosPrivate = useAxiosPrivate()

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let isMounted = true
    // To cancel our request, when the Component unmounts (useful if we have pending requests when Component unmounts)
    const controller = new AbortController()

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/users', {
          // To cancel request if we need to
          signal: controller.signal,
        })
        isMounted && setUsers(response.data)
      } catch (err) {
        console.error('Login again err', err)
        navigate('/login', { state: { from: location }, replace: true })
      }
    }

    getUsers()

    // Clean up function, abort pending requests when the Component unmounts
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {console.log('users', users)}
          {users.map((user, i) => (
            <li key={i}>{user?.userName}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  )
}

export default Users
