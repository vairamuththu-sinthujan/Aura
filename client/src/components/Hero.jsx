import { Link } from 'react-router-dom';
import { RiSparklingFill } from 'react-icons/ri';
import images from '../assets/assets';

const Hero = () => {
  return (
    <section className="min-h-screen text-gray-200 py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="flex-1 space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <RiSparklingFill className="text-3xl text-gray-600 sm:text-gray-200" />
            <span className="text-sm font-medium tracking-wider text-gray-600 sm:text-gray-200">
              JOIN THE MOVEMENT
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight 
             text-transparent 
             bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 
             bg-clip-text">
            Where Connections
            <br />
            <span className=" text-gray-200">
              Create Magic
            </span>
          </h1>
          
          <p className="text-xl text-white max-w-2xl">
            Redefining social interaction with focus on meaningful connections.
            Share experiences, build communities, and discover your tribe.
          </p>

          <div className="flex items-center gap-6 mt-10">
            <Link 
              to="api/auth/login" 
              className="bg-gray-900 text-white px-8 py-4 rounded-full font-semibold 
                        hover:bg-gray-800 transition-colors border-2 border-gray-900
                        flex items-center gap-2"
            >
              Start Your Journey
              <RiSparklingFill className="text-xl text-white" />
            </Link>
          </div>

          {/* Stats
          <div className="flex gap-8 pt-12 border-t border-gray-300 mt-12">
            <div className="text-center pr-8 border-r border-gray-300">
              <div className="text-3xl font-bold text-gray-900">100K+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">10M+</div>
              <div className="text-gray-600">Daily Stories</div>
            </div>
          </div> */}
        </div>

        {/* Right Artwork */}
        <div className="flex-1 relative">
          <div className="rounded-3xl p-8 aspect-square flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Geometric Design */}
              <div className="hidden sm:inline-block absolute top-0 left-0 w-1/2 h-1/2 bg-gray-900 rounded-2xl overflow-hidden">
              <img src={images.heroimgFour} alt="hero-4" className='rounded-2xl w-full h-full hover:scale-110 transition-all cursor-pointer'/>
              </div>
              <div className="hidden sm:inline-block absolute bottom-0 right-0 w-1/2 h-1/2 bg-gray-700 rounded-2xl overflow-hidden">
              <img src={images.heroimgThree} alt="hero-3" className='rounded-2xl w-full h-full hover:scale-110 transition-all cursor-pointer' />
              </div>
              
              {/* Overlapping Circles */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full border-4 border-gray-900 overflow-hidden">
              <img src={images.heroimgtwo} alt="hero-2" className='rounded-full hover:scale-110 transition-all cursor-pointer' />
              </div>
              <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gray-900 rounded-full overflow-hidden">
              <img src={images.heroimgone} alt="hero-1" className='rounded-full hover:scale-110 transition-all cursor-pointer' />
              </div>
              
              {/* Text Elements */}
              <div className="absolute bottom-8 left-8 rotate-12 font-bold">
                <span className="bg-gray-900 text-white px-4 py-2 rounded-lg">Connect</span>
              </div>
              <div className="absolute top-8 right-8 -rotate-12">
                <span className=" hidden sm:inline-block bg-gray-700 text-white px-4 py-2 rounded-lg">Share</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;