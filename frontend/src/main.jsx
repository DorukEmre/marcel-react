import React from 'react'
import ReactDOM from 'react-dom/client'
// import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import './reset.css'
import './index.css'
import { AuthProvider } from './context/AuthProvider'

// import axios from 'axios'
// axios.defaults.baseURL = 'http://localhost:9191'

if (process.env.NODE_ENV === 'production') {
  //   disableReactDevTools()
  console.log('p')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>,
)
