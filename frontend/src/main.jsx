import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './reset.css'
import './index.css'
import { AuthProvider } from './context/AuthProvider'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:9191'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
)
