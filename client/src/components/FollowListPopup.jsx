import { FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const FollowListPopup = ({ isOpen, onClose, type, users }) => {

  const navigate = useNavigate()

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Main Container */}
      <div className="relative  rounded-lg shadow-lg  my-20 max-w-2xl max-h-[80vh] overflow-y-auto mx-auto bg-black">
        <div className="sticky top-0  p-4 border-b border-gray-700 ">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white capitalize">
              {type === 'followers' ? 'Followers' : 'Following'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>
        </div>

        <div className="divide-y ">
          {users?.length > 0 ? (
            users.map((username) => (
              <div 
                key={username}
                className="flex items-center p-4 hover:bg-gray-700 transition-colors"
              >
                {/* Profile Image Placeholder */}
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="font-medium text-white text-sm">
                      {username[0].toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">
                    {username}
                  </p>
                  <p className="text-sm text-gray-400 truncate cursor-pointer"
                  onClick={() => {navigate(`/${username}`)}}
                  >
                    @{username}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-400">
              No {type === 'followers' ? 'followers' : 'following'} yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowListPopup;