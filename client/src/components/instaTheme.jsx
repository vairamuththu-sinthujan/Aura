import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiSearch, FiPlusSquare, FiHeart, FiUser } from 'react-icons/fi';

const InstagramTheme = () => {
  const [storyViewed, setStoryViewed] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Main Content */}
      <div className="max-w-5xl mx-auto md:flex md:gap-8 p-4">
        {/* Left Column - Stories/Posts */}
        <div className="md:w-2/3 space-y-4">
          {/* Stories */}
          <div className="flex space-x-4 p-4 border-b border-gray-200 overflow-x-auto">
            {[1, 2, 3, 4].map((_, i) => (
              <div 
                key={i}
                className={`flex-shrink-0 w-16 h-16 rounded-full p-0.5 
                  ${storyViewed ? 'bg-gray-200' : 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500'}`}
                onClick={() => setStoryViewed(!storyViewed)}
              >
                <div className="bg-white rounded-full p-0.5">
                  <img 
                    src={`https://picsum.photos/100?random=${i}`} 
                    alt="story"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Posts */}
          <div className="space-y-8">
            {[1, 2, 3].map((post, i) => (
              <div key={i} className="border rounded-lg bg-white">
                {/* Post Header */}
                <div className="flex items-center p-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img 
                      src={`https://picsum.photos/100?random=${i+10}`}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="ml-3 font-semibold">username_{i+1}</span>
                </div>

                {/* Post Image */}
                <img
                  src={`https://picsum.photos/600/600?random=${i}`}
                  alt="post"
                  className="w-full object-cover"
                />

                {/* Post Actions */}
                <div className="p-4 space-y-2">
                  <div className="flex space-x-4 text-2xl">
                    <FiHeart className="cursor-pointer hover:text-red-500" />
                    <FiPlusSquare className="cursor-pointer hover:text-green-500" />
                    <FiSearch className="cursor-pointer hover:text-blue-500" />
                  </div>
                  <p className="font-semibold">1,234 likes</p>
                  <p><span className="font-semibold">username</span> Lorem ipsum dolor sit amet...</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Suggestions */}
        <div className="hidden md:block md:w-1/3 mt-8 space-y-4">
          <div className="flex items-center">
            <div className="w-14 h-14 rounded-full overflow-hidden">
              <img 
                src="https://picsum.photos/100?random=100"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4">
              <p className="font-semibold">your_username</p>
              <p className="text-gray-500 text-sm">Your Name</p>
            </div>
          </div>

          <div className="text-gray-500 flex justify-between items-center">
            <span>Suggestions For You</span>
            <button className="text-black text-sm font-semibold">See All</button>
          </div>

          {[1, 2, 3, 4, 5].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img 
                    src={`https://picsum.photos/100?random=${i+20}`}
                    alt="suggestion"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold">suggested_user_{i+1}</p>
                  <p className="text-xs text-gray-500">Suggested for you</p>
                </div>
              </div>
              <button className="text-blue-500 text-sm font-semibold">Follow</button>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      
    </div>
  );
};

export default InstagramTheme;