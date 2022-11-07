import axios from 'axios'

const domain = window.location.hostname
let serverLoc
if (domain === 'marcel-the-outdoor-cat-react.herokuapp.com') {
  serverLoc = 'https://marcel-the-outdoor-cat-react.herokuapp.com/'
} else if (domain === 'marcel-the-outdoor-cat.onrender.com') {
  serverLoc = 'https://marcel.onrender.com'
} else if (domain === 'marcel.onrender.com') {
  serverLoc = 'https://marcel.onrender.com'
} else if (domain === 'marcel-the-outdoor-cat.cyclic.app') {
  serverLoc = 'https://marcel-the-outdoor-cat.cyclic.app/'
} else if (domain === 'marcel-the-cat.up.railway.app') {
  serverLoc = 'https://marcel-the-cat.up.railway.app/'
}

const BASE_URL =
  process.env.NODE_ENV === 'production' ? serverLoc : 'http://localhost:9191'

export default axios.create({
  baseURL: BASE_URL,
})

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
