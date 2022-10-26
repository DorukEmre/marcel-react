import axios from 'axios'
import useAuth from './useAuth'

const useLogout = () => {
  const { setAuth } = useAuth()

  const logout = async () => {
    setAuth({})
    try {
      const response = await axios('/api/logout', {
        withCredentials: true,
      })
    } catch (err) {
      console.error(err)
    }
  }

  return logout
}

export default useLogout
