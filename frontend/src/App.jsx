import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import RequireAuth from './components/RequireAuth'
import PersistLogin from './components/PersistLogin'

import Home from './pages/Home'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Feed from './pages/Feed'
import Explore from './pages/Explore'
import Spot from './pages/Spot'
import Groups from './pages/Groups'
import Profile from './pages/Profile'
import Missing from './pages/Missing'
import Users from './components/Users'
import ProfileMe from './pages/ProfileMe'
import ProfileSettings from './pages/ProfileSettings'

function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<LogIn />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Home />}></Route>

          {/* protected routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="feed" element={<Feed />}></Route>
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="explore" element={<Explore />}></Route>
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="spot" element={<Spot />}></Route>
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="groups" element={<Groups />}>
                <Route path=":groupid" element={<Groups />} />
              </Route>
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="profile" element={<Profile />}>
                <Route path="me" element={<ProfileMe />} />
                <Route path="settings" element={<ProfileSettings />} />
              </Route>
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="users" element={<Users />}>
                <Route path=":userid" element={<Users />} />
              </Route>
            </Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
