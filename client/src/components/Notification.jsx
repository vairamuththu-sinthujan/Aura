import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { FiX, FiHeart, FiUserPlus, FiMessageSquare } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Notification = ({ localNotifications }) => {
  // const [localNotifications, setLocalNotifications] = useState(notifications || []);

  const queryClient = useQueryClient();
  const {backendUrl} = useContext(AppContext)


  const deleteMutation = useMutation({
    mutationFn: async ({notificationId:notificationId}) => {
      const res = await fetch(`${backendUrl}/api/notification/delete/${notificationId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.Success == false) {
        throw new Error(data.Message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notification"],
      });
    }
  })

  const handleDelete = ({notificationId:notificationId}) => {
    deleteMutation.mutate({notificationId:notificationId})
  };

  const getActionIcon = (type) => {
    switch (type) {
      case 'like':
        return <FiHeart className="w-5 h-5 text-pink-500" />;
      case 'follow':
        return <FiUserPlus className="w-5 h-5 text-blue-500" />;
      case 'comment':
        return <FiMessageSquare className="w-5 h-5 text-green-500" />;
      default:
        return <FiMessageSquare className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="rounded-lg text-white">
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold">Notifications</h3>
      </div>

      {localNotifications.length === 0 ? (
        <div className="p-6 text-center text-white">
          No notifications to show
        </div>
      ) : (
        <div className="divide-y divide-gray-700 flex flex-col gap-2">
          {localNotifications.map(notification => (
            <div 
              key={notification._id}
              className="flex items-start p-4 group transition-colors bg-gray-800 rounded-2xl"
            >
              {/* Icon */}
              <div className="flex-shrink-0 mt-1 mr-3">
                {getActionIcon(notification.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Link 
                    to={`/${notification.from}`}
                    className="inline-flex items-center hover:underline"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-2">
                      <span className="text-sm font-medium">
                        {notification.from[0].toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium">
                      {notification.from}
                    </span>
                  </Link>
                  
                  <span className="text-gray-300">
                    {notification.message}
                  </span>
                </div>

                <div className="mt-2 text-xs text-gray-400">
                  {new Date(notification.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete({notificationId:notification._id})}
                className="ml-3 opacity-0 group-hover:opacity-100 text-white hover:text-gray-400 transition-opacity"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;