import React, { useContext } from 'react'
import PostUpload from '../components/PostUpload'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import PageNotFoundComponent from '../components/PageNotFoundComponent'

const CreatePost = () => {
  const {myData} = useContext(AppContext)
  const {user} = useParams()
  console.log(user)
  return (
    <div>
        { myData.name == user ? <PostUpload/> : <PageNotFoundComponent/>}
    </div>
  )
}

export default CreatePost