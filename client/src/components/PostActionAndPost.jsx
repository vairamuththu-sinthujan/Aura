import React, { useContext, useState } from 'react'
import { FiBookmark, FiDelete, FiEdit, FiHeart, FiMessageCircle } from 'react-icons/fi'
import { AppContext } from '../context/AppContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import PostDeleting from './PostDeleting '
import CommentPopup from './CommentPopup';
import SeeAllComments from './SeeAllComments'
import SeeAllLikes from './SeeAllLikes'
import EditPost from './EditPost'
import { useNavigate } from 'react-router-dom'


const PostActionAndPost = ({img, text, indexNo, user, postId, likes, saves, comments}) => {

  const {backendUrl, myData} = useContext(AppContext)
  const queryClient = useQueryClient()
  const [expanded, setExpanded] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isSeeComment, setIsSeeComment] = useState(false);
  const [isSeeLikes, setIsSeeLikes] = useState(false);
  const [isSeeEdit, setIsSeeEdit] = useState(false);
  const navigate = useNavigate()



  const toggleText = () => {
    setExpanded(!expanded);
  };

  const truncatedText = text.length > 30 ? text.substring(0, 30) : text;

  const mutation = useMutation({
    mutationFn : async () => {
      const res = await fetch(`${backendUrl}/api/post/delete`, {
        method: "DELETE",
        body: JSON.stringify({
          postId:postId,
          name:user,
        }),
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json()

      if (data.Success == false) {
        throw new Error(data.Message)
      }

      queryClient.invalidateQueries({
        queryKey: ['userPost'],
      })
      queryClient.invalidateQueries({
        queryKey: ['getUser'],
      })

      return data
    },
    onSuccess: () => {
      toast.success('post deleted')
    }
  })

  const handleDelete = () => {
    mutation.mutate()
  }

  const likeUnlikeMutation = useMutation({
    mutationFn: async ({postId:postId}) => {
      const res = await fetch(`${backendUrl}/api/post/like_and_unlike/${postId}`, {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.Success == false) {
        throw new Error(data.Message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userPost"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllPost"],
      });
      queryClient.invalidateQueries({
        queryKey: ["savedPost"],
      })
    },
    onError: (error) => {
      toast.error(error.message);
    },
  })

  const saveUnsaveMutation = useMutation({
    mutationFn: async ({postId:postId}) => {
      const res = await fetch(`${backendUrl}/api/post/save_and_unsave/${postId}`, {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.Success == false) {
        throw new Error(data.Message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userPost"],
      });
      // queryClient.invalidateQueries({
      //   queryKey: ["getAllPost"],
      // });
      queryClient.invalidateQueries({
        queryKey: ["savedPost"],
      })
      toast.success("post saved/unsaved successfully")
    },
    onError: (error) => {
      toast.error(error.message);
    },
  })


  // const getAllcommentMutation = useMutation({
  //         mutationFn: async ({postId:postId}) => {
  //           const res = await fetch(`${backendUrl}/api/post/get_all_comment/${postId}`, {
  //             credentials: "include",
  //             method: "GET",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //           });
  //           const data = await res.json();
  //           if (data.Success == false) {
  //             throw new Error(data.Message);
  //           }
  //           return data.comments;
  //         },
  //         onSuccess: () => {
  //           queryClient.invalidateQueries({
  //             queryKey: ["userPost"],
  //           });
  //           queryClient.invalidateQueries({
  //             queryKey: ["getAllPost"],
  //           });
  //         },
  //         onError: (error) => {
  //           toast.error(error.message);
  //         },
  //       })

  const handleLike = () => {
    likeUnlikeMutation.mutate({postId:postId});
    
  };


  const handleSave = () => {
    saveUnsaveMutation.mutate({postId:postId})
    
  }

  if (mutation.isPending) {
    return (<div>
      <PostDeleting message="Deleting post..."/>
    </div>)
  }
  if (mutation.error) {
    return (<div>{mutation.error.message}</div>)
  }
  return (
    <div className=' bg-black border-0 rounded-lg text-white overflow-hidden'>
        <div className="space-y-8">
            <div className=" border-0 rounded-lg">
            {/* Post Image */}
            <img
                src={img}
                alt={`post-${indexNo}`}
                className="w-full h-100 object-cover border-0 rounded-t-lg"
            />
            {/* Post Actions */}
            <div className="p-4 space-y-2">
                <div className="flex space-x-4 text-2xl">
                <FiHeart className={`cursor-pointer ${likes && likes.includes(myData.name) ? 'text-red-500' : likeUnlikeMutation.isPending ? 'animate-ping' : 'text-white'}`} 
                onClick={handleLike}
                />
                <FiMessageCircle className="cursor-pointer hover:text-green-500" 
                onClick={() => setIsCommentOpen(true)}
                />
                <FiBookmark className={`cursor-pointer ${saves && saves.includes(myData.name) ? 'text-green-400' : saveUnsaveMutation.isPending ? 'animate-ping' : 'text-white'}`} 
                onClick={handleSave}
                />
                {myData.name == user ? <FiEdit className="cursor-pointer hover:text-blue-500" 
                onClick={ () => setIsSeeEdit(true)}
                /> : null}
                {myData.name == user ? <FiDelete className={`cursor-pointer hover:text-red-500 `}
                onClick={() => handleDelete()}
                /> : null}
                </div>
                <div className=' flex flex-row gap-2'>
                <p className="font-semibold cursor-pointer"
                onClick={() => setIsSeeLikes(true)}
                >{likes?.length} like{likes?.length > 1 ? 's' : ''}</p>
                <p className="font-semibold cursor-pointer"
                onClick={() => setIsSeeComment(true)}
                >{comments?.length} comment{comments?.length > 1 ? 's' : ''}</p>
                <p className="font-semibold">{saves?.length} save{saves?.length > 1 ? 's' : ''}</p>
                </div>
                <p className=' transition-all'>
                  <span className="font-semibold cursor-pointer hover:text-gray-500 transition-all"
                  onClick={() => navigate(`/${user}`)}
                  >{user} </span>
                    {expanded ? text : truncatedText}
                    {text.length > 20 && (
                  <button onClick={toggleText}>
                    {expanded ? <span className=' font-serif opacity-50'>...seeless</span> :<span className=' font-serif opacity-50'>...seemore</span>}
                  </button>
                )}
              </p>
            </div>
            </div>
        </div>
        <CommentPopup
        isOpen={isCommentOpen}
        onClose={() => setIsCommentOpen(false)}
        postId = {postId}
      />
      <SeeAllComments
      isOpen={isSeeComment}
      onClose={() => setIsSeeComment(false)}
      postId = {postId}
      comments = {comments}
      />
      <SeeAllLikes
      isOpen={isSeeLikes}
      onClose={() => setIsSeeLikes(false)}
      postId = {postId}
      likes = {likes}
      />

      <EditPost
      isOpen={isSeeEdit}
      onClose={() => setIsSeeEdit(false)}
      postId = {postId}
      text = {text}
      />
      
    </div>
  )
}

export default PostActionAndPost