import React, { useContext } from 'react'
import {Navigate, Route,Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import {Toaster} from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext'
import bgImage from './assets/bgImage.svg'

const App = () => {
  const {authUser}=useContext(AuthContext);

  return (
    <div style={{ backgroundImage: `url(${bgImage})`,height:'100vh', backgroundRepeat: 'no-repeat' }}>

      <Toaster/>

      <Routes>
        <Route path='/' element={ authUser ? <HomePage/>:<Navigate to="/login"/>} />
        <Route path='/login' element={!authUser ? <LoginPage/>:<Navigate to="/"/>} />
        <Route path='/profile' element={authUser ?<ProfilePage/> :<Navigate to="/login"/>} />

      </Routes>
    </div>
  )
}

export default App;