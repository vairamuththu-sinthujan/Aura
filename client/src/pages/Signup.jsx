import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import images from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FullPageLoader } from '../components/Loader';
import { AppContext } from '../context/AppContext';
import { useQueryClient } from '@tanstack/react-query';

// Signup Component
const Signup = () => {
  const {backendUrl}= useContext(AppContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    terms: false,
  });
  const [isloading, setIsloading] = useState(false)
  const queryClient = useQueryClient()

  const handleSubmit = async (e,formData) => {
    e.preventDefault();
    // Handle signup logic
    if(formData.terms == false) {
      return toast.error('Please Accept Terms & Conditions.')
    }
    else {
      setIsloading(true)
      try {
        axios.defaults.withCredentials = true;
        const {data} = await axios.post(`${backendUrl}/api/auth/register`,{name:formData.name, email: formData.email, password:formData.password},
          {headers: {
            "Content-Type": 'application/json'
          }}
        )
        if (data.Success) {
          queryClient.invalidateQueries({
            queryKey: ["authUser"]
          })
          toast.success("account created sucssfully")
        }
        else {
          toast.error(data.Message)
        }
      } catch (error) {
        toast.error(error.message)
      }
      setIsloading(false)
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4`}>
      {isloading && <FullPageLoader/>}
      <div className={`${ isloading ? "hidden": ''} relative w-full max-w-md  rounded-lg p-8 space-y-6`}>
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="h-10 w-10 bg-white rounded-full overflow-hidden ">
            <Link to='/'>
                <img src={images.logo} alt="logo" className='rounded-full hover:scale-150 transition-all' />
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-transparent 
             bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 
             bg-clip-text">Aura</h1>
        </div>
        <form onSubmit={(e) => handleSubmit(e, formData)} className="space-y-6" name="signup-form">
          <div className="space-y-4">
            <div>
              <label className="text-white text-sm font-medium">Username</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all"
                required
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                name='fullname'/>
            </div>
            <div>
              <label className="text-white text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full mt-1 px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all"
                required
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                name='email'
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full mt-1 px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all"
                required
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                name='password'
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4 cursor-pointer"
                required
                onChange={(e) => setFormData({...formData, terms: e.target.checked})}
                name='term-con-checkbox'
                checked ={formData.terms}/>
              <span className="text-white text-sm">
                I accept the <Link to= '/api/auth/terms' className="underline">Terms & Conditions</Link>
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all cursor-pointer"
            >
            Create Account
          </button>
        </form>

        <p className="text-center text-white">
          Already have an account?{' '}
          <Link to="/api/auth/login" className="underline hover:text-gray-300 transition-colors">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup