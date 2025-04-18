import React, { useState } from 'react'
import { FullPageLoader } from '../components/Loader'
import images from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const ResetPasswordOtp = () => {
    const [isLoading, setIsloading] = useState(false)
    const [email, setEmail] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsloading(true)
        try {
          axios.defaults.withCredentials = true;
          const {data} = await axios.post("http://localhost:4000/api/auth/reset-otp", {email:email},
              {
                headers: {
                  "Content-Type": "application/json"
                }
              }
            )
            if (data.Success){
              toast.success(data.Message)
              navigate('/api/auth/reset-password')
            }
            else {
              toast.error(data.Message)
            }
          } catch (error) {
            toast.error(error.message)
          }
        setIsloading(false)
    }
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
        {isLoading && <FullPageLoader/>}
        <div className={`${isLoading ? 'hidden': ''} relative w-full max-w-md  rounded-lg p-8 space-y-6`}>
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="h-10 w-10 bg-white rounded-full overflow-hidden">
                <Link to='/'>
                    <img src={images.logo} alt="logo" className='rounded-full hover:scale-150 transition-all' />
                </Link>
            </div>
            <h1 className="text-3xl font-bold text-transparent 
             bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 
             bg-clip-text">Aura</h1>
          </div>
          <form  className="space-y-6" name="login-form" onSubmit={(e) => handleSubmit(e)}>
            <div className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full mt-1 px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all"
                  required
                  name="password"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all cursor-pointer"
            >
              Sent OTP
            </button>
          </form>
        </div>
      </div>
  )
}

export default ResetPasswordOtp