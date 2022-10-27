import axios from 'axios'
const BASE_URL = 'http://localhost:9191'
// const BASE_URL = 'https://marcel-the-outdoor-cat.onrender.com'
// const BASE_URL = 'https://long-blue-sawfish-cuff.cyclic.app'
// const BASE_URL = 'https://marcel-the-outdoor-cat.up.railway.app/'
// const BASE_URL = 'https://marcel-the-outdoor-cat-react.herokuapp.com/'

export default axios.create({
  baseURL: BASE_URL,
})

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
