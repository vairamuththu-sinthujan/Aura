import { useContext } from 'react';
import { FiUserPlus, FiCheck } from 'react-icons/fi';
import images from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useFollowUnfollow } from '../hooks/useFollowUnfollow';

const UserSuggestions = ({ title = "Suggested Users", suggestions = [] }) => {
  const { myData} = useContext(AppContext)
  const navigate = useNavigate()

  const followUnfollow = useFollowUnfollow()

  // const mutation = useMutation({
  //   mutationFn: async ({user:user}) => {
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
  //       }),
  //       queryClient.invalidateQueries({
  //         queryKey: ["suggestions"]
  //       })
  //       toast.success(data.Message)
  //     }
  //   },onError: (error) => {
  //     toast.error(error.message)
  //   },
  //   retry: false
  // },)


  const handleFolowUnfolow = ({user:user}) => {
    followUnfollow.mutate({user:user})
  }


  return (
    <div className="rounded-lg">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      
      <div className="divide-y max-h-96 overflow-y-auto flex flex-col gap-2">
        {suggestions.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-white">No suggestions</p>
          </div>
        )}
        {suggestions.map(user => (
          <div key={user._id} className="flex items-center p-4 bg-gray-800 rounded-2xl">
            {/* Avatar */}
            <div className="flex-shrink-0 mr-3">
              
                <img
                  src={user.profileImg? user.profileImg : images.heroimgone}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0 text-white">
              <p className="font-medium text-sm truncate">{user.fullName}</p>
              <p className="text-sm truncate cursor-pointer"
              onClick={() => navigate(`/${user.name}`)}
              >@{user.name}</p>
              <p className="text-xs mt-1">
                {user.followers.length.toLocaleString()} followers
              </p>
            </div>

            {/* Follow Button */}
            <button
            key={user._id}
              onClick={() => handleFolowUnfolow({user:user.name})}
              className={`flex items-center px-3 py-1.5 rounded-full text-sm ${
                user.followers.includes(myData.name)
                  ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {user.followers.includes(myData.name) ? (
                <>
                  <FiCheck className="mr-1" />
                  {followUnfollow.isPending ? ".........." : "Following"}
                </>
              ) : (
                <>
                  <FiUserPlus className="mr-1" />
                  {followUnfollow.isPending ? ".........." : "Follow"}
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSuggestions;