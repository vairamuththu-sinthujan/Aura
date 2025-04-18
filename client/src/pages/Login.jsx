import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import images from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FullPageLoader } from '../components/Loader';
import { AppContext } from "../context/AppContext";
import { useQueryClient } from "@tanstack/react-query";

const Login = () => {
  const queryClient = useQueryClient()
  const {backendUrl}= useContext(AppContext)
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

    const [isLoading, setIsloading] = useState(false)
  
    const handleSubmit = async (e,formData) => {
      e.preventDefault();
      // Handle login logic
      setIsloading(true)
      try {
        axios.defaults.withCredentials = true;
        const {data} = await axios.post(`${backendUrl}/api/auth/login`, {email:formData.email, password:formData.password},
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        if (data.Success){
          queryClient.invalidateQueries({
            queryKey: ["authUser"]
          })
          toast.success(data.Message)
        }
        else {
          toast.error(data.Message)
        }
      } catch (error) {
        toast.error(error.message)
      }
      setIsloading(false)
    };
  
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
  
          <form onSubmit={(e) => handleSubmit(e,formData)} className="space-y-6" name="login-form">
            <div className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full mt-1 px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all"
                  required
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  name="password"
                />
              </div>
  
              <div>
                <label className="text-white text-sm font-medium">Password</label>
                <input
                  type="password"
                  className="w-full mt-1 px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all"
                  required
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  name="password"
                />
              </div>
            </div>
  
            <button
              type="submit"
              className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all cursor-pointer"
            >
              Login
            </button>
          </form>
          <p className="text-center text-white">
            Don't have an account?{' '}
            <Link to="/api/auth/register" className="underline hover:text-gray-300 transition-colors">
              Sign up here
            </Link>
          </p>
          <p className="text-center text-white">
            forget password?{' '}
            <Link to="/api/auth/reset-otp" className="underline hover:text-gray-300 transition-colors">
              Reset password
            </Link>
          </p>
        </div>
      </div>
    );
  };


export default Login