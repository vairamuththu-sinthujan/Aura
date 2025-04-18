import React, { useContext } from 'react'
import {Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import images from './assets/assets'
import {  ToastContainer } from 'react-toastify';
import LandingPage from './pages/LandingPage'
import Home from './pages/Home'
import ResetPasswordOtp from './pages/ResetPasswordOtp'
import RestPassword from './pages/RestPassword'
import User from './pages/User'
import { useQuery } from '@tanstack/react-query'
import { AppContext } from './context/AppContext'
import { FullPageLoader } from './components/Loader'
import CreatePost from './pages/CreatePost'
import Edit from './pages/Edit'
import AccVerify from './pages/AccVerify'
import NotificationPage from './pages/NotificationPage'
import About from './pages/About'


const App = () => {
  const {backendUrl, setMydata} = useContext(AppContext)
  
  const {data,isLoading,error} = useQuery({
    queryKey : ['authUser'],
    queryFn : async () => {
      try {
        const res = await fetch(`${backendUrl}/api/users/me`, {
          method : "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        })
        const data = await res.json()

        if (data.Success == false) {
          return null
        }
        else {
          setMydata(data.userData)
          return data.userData
        }
      } catch (error) {
        throw new Error(error.message)
        
      }
    },
    retry: false,
  })



  if (isLoading) {
    return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-cover bg-center overflow-y-scroll h-[100vh]' style={{ backgroundImage: `url(${images.bg})` }}>
      <FullPageLoader/>
    </div>)
  }
  if (error) {
    return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-cover bg-center overflow-y-scroll h-[100vh]' style={{ backgroundImage: `url(${images.bg})` }}>
      server error
    </div>)
  }
  else {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-cover bg-center overflow-y-scroll h-[100vh]' style={{ backgroundImage: `url(${images.bg})` }}>
      <ToastContainer />
      <Routes>
        <Route path='/' element = {!data ? <LandingPage/> : <Navigate to='/home'/>}/>
        <Route path='/api/auth/register' element = {!data ? <Signup/> : <Navigate to='/home'/>}/>
        <Route path='/api/auth/login' element = {!data ? <Login/> : <Navigate to='/home'/>}/>
        <Route path='/api/auth/terms' element = {<About/>}/>
        <Route path='/api/auth/reset-otp' element = {!data ? <ResetPasswordOtp/>: <Navigate to='/home'/>}/>
        <Route path='/api/auth/reset-password' element = {!data ? <RestPassword/> : <Navigate to='/home'/>}/>
        <Route path='/home' element = {data? <Home/> : <Navigate to='/api/auth/login'/>}/>
        <Route path='/:user' element = {data ? <User/> : <Navigate to='/api/auth/login'/>}/>
        <Route path='/:user/createpost' element = {data ? <CreatePost/> : <Navigate to='/api/auth/login'/>}/>
        <Route path='/:user/edit' element = {data ? <Edit/> : <Navigate to='/api/auth/login'/>}/>
        <Route path='/:user/notification' element = {data ? <NotificationPage/> : <Navigate to='/api/auth/login'/>}/>
        <Route path='/:user/verify' element = {data ? <AccVerify/> : <Navigate to='/api/auth/login'/>}/>
        <Route path='*' element = {<PageNotFound/>}/>
      </Routes>
    </div>
  )
}
}

export default App