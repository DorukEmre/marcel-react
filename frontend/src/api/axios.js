import axios from 'axios'
// const BASE_URL = 'http://localhost:9191'
// const BASE_URL = 'https://marcel-the-outdoor-cat.onrender.com'
// const BASE_URL = 'https://long-blue-sawfish-cuff.cyclic.app'
// const BASE_URL = 'https://marcel-the-outdoor-cat.up.railway.app/'
// const BASE_URL = 'https://marcel-the-outdoor-cat-react.herokuapp.com/'

console.log('import BASE_URL', import.meta.env.BASE_URL)
console.log('import VITE_TEST_VAR', import.meta.env.VITE_TEST_VAR)
console.log('import VITE_LAST_ONE', import.meta.env.VITE_LAST_ONE)

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
} else if (domain === 'marcel-the-outdoor-cat.up.railway.app') {
  serverLoc = 'https://marcel-the-outdoor-cat.up.railway.app/'
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
