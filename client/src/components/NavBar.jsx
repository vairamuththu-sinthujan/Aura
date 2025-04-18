import React, { useContext, useState } from 'react'
import { FiBell, FiHome, FiPlusSquare, FiSearch } from 'react-icons/fi'
import images from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import SearchPopup from './SearchPopup'

const NavBar = () => {
    const navigate = useNavigate()
    const {myData} = useContext(AppContext)
    const [showSearch, setShowSearch] = useState(false);


  return (
    <div className=' text-white'>
        <div className="w-full lg:w-0 lg:h-[100vh] fixed -traslate-x-[50%] -traslate-y-[50%] bg-black left-0 lg:left-auto bottom-0 lg:top-0">
        <div className="flex lg:flex-col justify-around p-4 text-2xl h-full">
          <FiHome className={` cursor-pointer transition-all hover:text-green-400`}  onClick={() => { navigate("/home")}} title='home'/>
          <FiSearch className={` cursor-pointer transition-all hover:text-green-400`}
          onClick={() => setShowSearch(true)}
          title='search'
          />
          <FiPlusSquare className={` cursor-pointer transition-all hover:text-green-400`} onClick={() => {navigate(`/${myData.name}/createpost`)}}
          title='upload'
          />
          <FiBell className={`cursor-pointer transition-all hover:text-red-400`}
          onClick={() => {navigate(`/${myData.name}/notification`)}}
          title='notification'
          />
          <div className="w-6 h-6 rounded-full overflow-hidden cursor-pointer" onClick={() => navigate(`/${myData.name}`)}>
            <img 
              src={myData.profileImg? myData.profileImg : images.heroimgone}
              alt="profile"
              className="w-full h-full object-cover"
              title={myData.name}
            />
          </div>
        </div>
      </div>
      <SearchPopup
      isOpen={showSearch}
      onClose={() => setShowSearch(false)}
      />
    </div>
  )
}

export default NavBar