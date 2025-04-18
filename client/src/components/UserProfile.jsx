import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { useQuery } from '@tanstack/react-query';
import { FullPageLoader } from './Loader';
import PageNotFoundComponent from './PageNotFoundComponent';
import ProfileHeader from './ProfileHeader';
import PostComponent from './PostComponent';
import SavedComponent from './SavedComponent';
import { FiBookmark, FiGrid, FiHome } from 'react-icons/fi';
import NavBar from './NavBar';

const UserProfile = () => {
    const {backendUrl}= useContext(AppContext)
    const {myData} = useContext(AppContext)
    const [isMe, setIsme] = useState(false)
    const [isPostState, setIsPostState] = useState(true)
    const navigate = useNavigate()  

    const {user} = useParams()

    const {data:userData,isLoading,error, refetch, isRefetching} = useQuery({
      queryKey:["getUser"],
      queryFn: async () => {
        try {
          const res = await fetch(`${backendUrl}/api/users/${user}`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            }
          })
          const data = await res.json()
          if (data.Success == false) {
            throw new Error(data.Message)
          }
          else {
            return data.userdata
          }
        } catch (error) {
          toast.error(error.message)
          throw new Error(error.message)
        }
      },
      retry:false,
      enabled: !!user
    })


    useEffect(() => {
      if (userData && myData) {
        setIsme(myData.name === userData.name);
        
      }
      refetch()
    }, [userData, myData,isMe,user,refetch]);

  if (isLoading || isRefetching) {
    return (<FullPageLoader/>)
  }
  if (error) {
    return (<PageNotFoundComponent/>)
  }
  return (
    <>
    <ProfileHeader userData = {userData} isMe = {isMe}/>
    {/* Posts Navigation */}
    <div className="border-t-2 mt-8 border-white">
        <div className="flex justify-center gap-16 text-white">
        <button className={`py-4 flex items-center cursor-pointer gap-2 border-t-2 border-transparent transition-all`}
          onClick={() => navigate("/home")}
          >
            <FiHome className="text-xl" />
            <span className="text-sm font-medium">HOME</span>
          </button>


          <button className={`${isPostState ? "text-green-500": "text-white"} py-4 flex items-center cursor-pointer gap-2 border-t-2 border-transparent transition-all`}
          onClick={() => setIsPostState(true)}
          >
            <FiGrid className="text-xl" />
            <span className="text-sm font-medium">POSTS</span>
          </button>
          <button className={` ${isPostState ? "text-white": "text-green-500"} py-4 flex items-center cursor-pointer gap-2  border-t-2 border-transparent transition-all`}
          onClick={() => setIsPostState(false)}
          >
            <FiBookmark className="text-xl" />
            <span className="text-sm font-medium">SAVED</span>
          </button>
        </div>
      </div>
      <div className='mb-16'>
    {isPostState? <PostComponent /> : <SavedComponent/>}
    </div>
    </>
  );
};


export default UserProfile