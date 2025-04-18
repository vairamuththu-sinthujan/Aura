import React, { useContext, useState } from 'react'
import { FiEdit, FiUserPlus, FiLogOut, FiCheckCircle } from 'react-icons/fi';
import images from '../assets/assets';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { AppContext } from '../context/AppContext';
import FollowListPopup from './FollowListPopup';
import { useFollowUnfollow } from '../hooks/useFollowUnfollow';

const ProfileHeader = ({userData, isMe }) => {
    const navigate = useNavigate()
    const {backendUrl, myData} = useContext(AppContext) 
    const queryClient = useQueryClient()
    const {user} = useParams()
    const [showList, setShowList] = useState(null);

    const followUnfollow = useFollowUnfollow()

    const handlelogout = async () => {
        // Handle logout logic
        try {
          axios.defaults.withCredentials = true;
          const {data} = await axios.post(`${backendUrl}/api/auth/logout`,{},
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
      };



      // const mutation = useMutation({
      //   mutationFn: async ({user}) => {
      //     const res = await fetch(`${backendUrl}/api/users/follow/${user}`, {
      //       credentials: "include",
      //       method:"POST",
      //       headers: {
      //         "Content-Type": "application/json"
      //       },
      //       body:JSON.stringify()
      //     })
      //     const data = await res.json()
      //     console.log(data)
      //     if (!data.Success) {
      //       throw new Error(data.Message)
      //     }
      //     else {
      //       queryClient.invalidateQueries({
      //         queryKey: ["getUser"]
      //       })
      //       toast.success(data.Message)
      //     }
      //   },onError: (error) => {
      //     toast.error(error.message)
      //   },
      //   retry: false
      // },)



    const handleFolowUnfolow = () => {
      followUnfollow.mutate({user})
    }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-4">
      {/* Cover Image */}
      <div className="w-full h-48 md:h-64 bg-gray-300 overflow-hidden rounded-lg">
        <img
          src={userData.coverImg || images.heroimgtwo}
          alt={`${userData.name}-cover`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mt-4">
        {/* Avatar */}
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gray-200">
          <img
            src={userData.profileImg || images.heroimgtwo}
            alt={`${userData.name}-profile`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-4 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-center">
            <h1 className="text-2xl font-light text-white text-center">@{userData.name}</h1>
            {userData.isAccVerified && (
              <FiCheckCircle className="text-green-500 text-center" title="Verified Account" />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center sm:justify-start gap-2">
            {isMe ? (
              <>
                <button
                  className="px-4 py-1.5 text-sm font-medium bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-2 transition-all"
                  onClick={() => navigate(`/${userData.name}/edit`)}
                >
                  <FiEdit /> Edit Profile
                </button>
                <button
                  className="px-4 py-1.5 text-sm font-medium bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-2 transition-all"
                  onClick={handlelogout}
                >
                  <FiLogOut /> Log Out
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <button className="px-4 py-1.5 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                onClick={handleFolowUnfolow}
                >
                  {followUnfollow.isPending ? "..........." : (userData.followers.includes(myData.name) ? "following" : "follow")}
                </button>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex justify-center sm:justify-start gap-8 text-white">
            <div className="text-center">
              <span className="font-semibold block">{userData.postCount}</span>
              <span>posts</span>
            </div>
            <div className="text-center">
              <span className="font-semibold block">{userData.followers.length}</span>
              <span
              onClick={() => setShowList('followers')}
              >followers</span>
            </div>
            <div className="text-center">
              <span className="font-semibold block">{userData.following.length}</span>
              <span
              onClick={() => setShowList('following')}
              >following</span>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h2 className="font-semibold text-white">{userData.fullName}</h2>
            {userData.bio && <p className="text-white mt-1">{userData.bio}</p>}
          </div>

          {/* Account Creation Date */}
          <div className="text-gray-400 text-sm">
            Member since: {new Date(userData.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
      <FollowListPopup
        isOpen={!!showList}
        onClose={() => setShowList(null)}
        type={showList}
        users={showList === 'followers' ? userData.followers : userData.following}
      />
    </div>
  );
}

export default ProfileHeader