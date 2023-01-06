import axios from 'axios'

const domain = window.location.hostname
let serverLoc
if (domain === 'marcel.onrender.com') {
  serverLoc = 'https://marcel.onrender.com'
} else if (domain === 'marcel-the-cat.cyclic.app') {
  serverLoc = 'https://marcel-the-cat.cyclic.app/'
} else if (domain === 'marcel-the-cat.up.railway.app') {
  serverLoc = 'https://marcel-the-cat.up.railway.app/'
} else if (domain === 'marcel-the-cat.azurewebsites.net') {
  serverLoc = 'https://marcel-the-cat.azurewebsites.net/'
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
