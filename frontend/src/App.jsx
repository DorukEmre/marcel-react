import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import RequireAuth from './components/RequireAuth'

import Home from './pages/Home'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Feed from './pages/Feed'
import Missing from './pages/Missing'
import Users from './components/Users'
import PersistLogin from './components/PersistLogin'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>

          {/* protected routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/feed" element={<Feed />}></Route>
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="/users" element={<Users />}></Route>
            </Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
