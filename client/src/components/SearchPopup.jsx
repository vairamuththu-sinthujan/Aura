import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect, useRef, useContext } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { FullPageLoader } from './Loader';
import images from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import PostDeleting from './PostDeleting ';

const SearchPopup = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const searchInputRef = useRef(null);
  const {backendUrl} = useContext(AppContext)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);
  
  const findUsersMutation = useMutation({
    mutationFn: async ({userName:userName}) => {
      const res = await fetch(`${backendUrl}/api/users/find_users/${userName}`, {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.Success == false) {
        throw new Error(data.Message);
      }
      return data.users;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userPost"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllPost"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  })

  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault();
    findUsersMutation.mutate({userName:query})
    setQuery('')
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Search Container */}
      <div className="relative">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-3xl mx-auto flex items-center flex-col gap-1">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative bg-black rounded-lg border">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Searc people"
                  className="w-full pl-10 pr-12 py-3 rounded-lg focus:outline-none "
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-gray-400"
                >
                  <FiX size={24} />
                </button>
              </div>
            </form>

            {findUsersMutation.isSuccess ? (
            <div className="container mx-auto px-4 py-2 max-w-2xl bg-black shadow-lg rounded-b-lg">
              <div className="divide-y divide-gray-100">
                {findUsersMutation.data.map((user) => (
                  <div 
                    key={user._id}
                    className="flex items-center p-3 transition-colors"
                  >
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={user.profileImg || images.heroimgone}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover border border-gray-200"
                      />
                    </div>

                    {/* User Info */}
                    <div className="ml-3 flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {user?.fullName || user.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate cursor-pointer hover:text-gray-400 transition-all"
                      onClick={ () => navigate(`/${user.name}`)}
                      >
                        @{user.name}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Empty State */}
                {findUsersMutation.data.length === 0 && (
                  <div className="p-4 text-center text-white">
                    No users found
                  </div>
                )}
              </div>
            </div>
          ) : findUsersMutation.isPending ? <PostDeleting message = {'searching...'}/> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPopup;