import React, { useContext } from 'react'
import NavBar from '../components/NavBar'
import { useQuery } from '@tanstack/react-query'
import { AppContext } from '../context/AppContext'
import { FullPageLoader } from '../components/Loader'
import PostActionAndPost from '../components/PostActionAndPost'

const Home = () => {

  const {backendUrl} = useContext(AppContext)

  const {data:posts,isLoading,error} = useQuery({
    queryKey : ["getAllPost"],
    queryFn: async () => {

      const res = await fetch(`${backendUrl}/api/post/all`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },

      })
      const data = await res.json()

      if (data.Success == false) {
        throw  new Error (data.Message)
      }
      else {
        return data.posts
      }
    }
  })


  if (isLoading) {
    return (<FullPageLoader/>)
  }

  if (error) {
    return (<div>server error</div>)
  }
  
  return (
    <div className=''>
      <div className=''>
        <NavBar/>
      </div>
      {posts.length == 0 && <div className='text-center text-2xl font-semibold mt-10 text-white'>No posts yet</div>}
      <div className=' px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex flex-col gap-4 mt-5 mb-20 lg:mb-5'>
        {posts.map((post, i) => (<PostActionAndPost key={post._id} img = {post.img} text = {post.text} user = {post.userName} indexNo = {i} likes = {post.likes} saves = {post.savedPost} comments = {post.comments} postId = {post._id}/> ))}
      </div>
    </div>

  )
}

export default Home