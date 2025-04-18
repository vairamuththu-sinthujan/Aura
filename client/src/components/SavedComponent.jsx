import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { FullPageLoader } from './Loader'
import PageNotFound from '../pages/PageNotFound'
import PostActionAndPost from './PostActionAndPost'

const SavedComponent = () => {

  const {backendUrl} = useContext(AppContext)
      const {user} = useParams()
      const {data, isLoading, error} = useQuery({
          queryKey: ["savedPost"],
          queryFn: async () => {
              try {
                  const res = await fetch(`${backendUrl}/api/post/saved/${user}`, {
                      method: "GET",
                      credentials: "include",
                      headers: {
                          "Content-Type": "application/json"
                      },
                  })
  
                  const data = await res.json()
                  if (data.Success == false) {
                      throw new Error(data.Message)
                  }
                  else {
                      return data.post
                  }
              } catch (error) {
                  throw new Error(error.message)
              }
          },
          retry: false,
      })
      if (isLoading) {
          return (<FullPageLoader/>)
      }
      if (error) {
          return (<PageNotFound/>)
      }
    return (
      <div className=' flex flex-col-reverse gap-2 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
          {data.map((post, i) => (<PostActionAndPost key={post._id} img = {post.img} text = {post.text} user = {post.userName} indexNo = {i} postId = {post._id} likes ={post.likes} saves = {post.savedPost} comments={post.comments}/>))}
      </div>
    )
  }


export default SavedComponent