import axios from 'axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
  const { setAuth } = useAuth()
  console.log('useRefreshToken')

  const refresh = async () => {
    console.log('useRefreshToken refresh')
    const response = await axios.get('/refresh', {
      withCredentials: true,
    })
    setAuth((prev) => {
      console.log('useRefreshToken', JSON.stringify(prev))
      console.log('useRefreshToken', response.data.accessToken)
      return { ...prev, accessToken: response.data.accessToken }
    })
    return response.data.accessToken
  }
  return refresh
}

export default useRefreshToken
