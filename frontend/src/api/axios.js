import axios from 'axios'
// const BASE_URL = 'http://localhost:9191'
// const BASE_URL = 'https://marcel-the-outdoor-cat.onrender.com'
// const BASE_URL = 'https://long-blue-sawfish-cuff.cyclic.app'
// const BASE_URL = 'https://marcel-the-outdoor-cat.up.railway.app/'
// const BASE_URL = 'https://marcel-the-outdoor-cat-react.herokuapp.com/'

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://marcel-the-outdoor-cat-react.herokuapp.com/'
    : 'http://localhost:9191'

console.log('VITE_BASE_URL', import.meta.env.VITE_BASE_URL)
console.log(window.location.hostname)

export default axios.create({
  baseURL: BASE_URL,
})

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
