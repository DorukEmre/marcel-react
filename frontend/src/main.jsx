import React from 'react'
import ReactDOM from 'react-dom/client'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import './reset.css'
import './index.css'
import { AuthProvider } from './context/AuthProvider'
// import { QueryClient, QueryClientProvider } from 'react-query'

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 10,
//     },
//   },
// })

ReactDOM.createRoot(document.getElementById('root')).render(
  // <QueryClientProvider client={queryClient}>
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>,
  // </QueryClientProvider>,
)
