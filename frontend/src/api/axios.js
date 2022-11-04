import axios from 'axios'
// const BASE_URL = 'http://localhost:9191'
// const BASE_URL = 'https://marcel-the-outdoor-cat.onrender.com'
// const BASE_URL = 'https://long-blue-sawfish-cuff.cyclic.app'
// const BASE_URL = 'https://marcel-the-outdoor-cat.up.railway.app/'
// const BASE_URL = 'https://marcel-the-outdoor-cat-react.herokuapp.com/'

const domain = window.location.hostname
console.log(domain)
let serverLoc
if (domain === 'marcel-the-outdoor-cat-react.herokuapp.com') {
  console.log('You are using Heroku')
  serverLoc = 'https://marcel-the-outdoor-cat-react.herokuapp.com/'
} else if (domain === 'marcel-the-outdoor-cat.onrender.com') {
  console.log('You are using Render')
  serverLoc = 'https://marcel.onrender.com'
} else if (domain === 'marcel-the-outdoor-cat.cyclic.app') {
  console.log('You are using Cyclic')
  serverLoc = 'https://marcel-the-outdoor-cat.cyclic.app/'
} else if (domain === 'marcel-the-outdoor-cat.up.railway.app') {
  console.log('You are using Railway')
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
