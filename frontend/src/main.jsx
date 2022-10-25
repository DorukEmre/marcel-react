import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import './reset.css'
import './index.css'
import { AuthProvider } from './context/AuthProvider'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:9191'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>,
)
