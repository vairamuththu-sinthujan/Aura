import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import PageNotFoundComponent from '../components/PageNotFoundComponent'
import EditComponent from '../components/EditComponent'

const Edit = () => {
    const {user} = useParams()
    const {myData} = useContext(AppContext)
    const navigate = useNavigate()
    if (user != myData.name) {
        return (<PageNotFoundComponent/>)
    }
  return (
    <div className=' flex flex-col justify-center items-center mt-5'>
        {myData.isAccisAccVerified ? null : <button
          type="submit"
          className="bg-black text-white p-2 rounded-lg outline-none"
          onClick={() => navigate(`/${myData.name}/verify`)}
        >
          Verify your account
        </button>}
        <EditComponent/>
        
    </div>
  )
}

export default Edit