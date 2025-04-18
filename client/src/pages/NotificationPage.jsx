import React, { useContext } from 'react'
import Notification from '../components/Notification'
import { useQuery } from '@tanstack/react-query'
import { AppContext } from '../context/AppContext'
import { FullPageLoader } from '../components/Loader'
import { toast } from 'react-toastify'
import UserSuggestions from '../components/UserSuggestions'
import NavBar from '../components/NavBar'

const NotificationPage = () => {

    const {backendUrl, myData} = useContext(AppContext)

    const {data,isLoading, isError, error} = useQuery({
        queryKey: ["notification"],
        queryFn: async () => {

      
          const res = await fetch(`${backendUrl}/api/notification/${myData.name}`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            },
          });
      
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
      
          const data = await res.json();
      
          if (!data.Success) {
            throw new Error(data.Message);
          }
          return data.notifications
        },
        onSuccess: (notifications) => {
          if (notifications.length === 0) {
            toast.info("No new notifications");
          }
        },
        onError: (error) => {
          toast.error(error.message);
        },
        retry: false,
      });


      const {data:suggestions,isLoading:suggestionsLoading, isError:issuggestionsError, error:suggestionsError} = useQuery({
        queryKey: ["suggestions"],
        queryFn: async () => {

      
          const res = await fetch(`${backendUrl}/api/users/suggest_users`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            },
          });
      
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
      
          const data = await res.json();
      
          if (!data.Success) {
            throw new Error(data.Message);
          }
          return data.users
        },
        onSuccess: (notifications) => {
          if (notifications.length === 0) {
            toast.info("No new notifications");
          }
        },
        onError: (error) => {
          toast.error(error.message);
        },
        retry: false,
      });

if (isLoading || suggestionsLoading) {
    return (<FullPageLoader/>)
}
if (isError || issuggestionsError) {
    return (<h1>{error.message || suggestionsError.message}</h1>)
}
  return (
    <div>
   <NavBar/>
    <div className='flex flex-row justify-around'>
        <Notification 
        localNotifications={data}
        />
        <UserSuggestions
        suggestions={suggestions}
        />
    </div>
    </div>
  )
}

export default NotificationPage