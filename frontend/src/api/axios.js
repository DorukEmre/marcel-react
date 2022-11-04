import axios from 'axios'
// const BASE_URL = 'http://localhost:9191'
// const BASE_URL = 'https://marcel-the-outdoor-cat.onrender.com'
// const BASE_URL = 'https://long-blue-sawfish-cuff.cyclic.app'
// const BASE_URL = 'https://marcel-the-outdoor-cat.up.railway.app/'
// const BASE_URL = 'https://marcel-the-outdoor-cat-react.herokuapp.com/'

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.BASE_URL
    : 'http://localhost:9191'

console.log(process.env.NODE_ENV)
console.log(process.env.BASE_URL)
console.log(BASE_URL)

export default axios.create({
  baseURL: BASE_URL,
})

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
