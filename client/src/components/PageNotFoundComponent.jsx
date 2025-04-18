import { Link } from 'react-router-dom';

const PageNotFoundComponent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="text-center md:text-left">
          <h1 className="text-9xl font-bold text-gray-200 mb-4">404</h1>
          <h2 className="text-4xl font-semibold text-gray-200 mb-6">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-md">
            The page you're looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <Link
            to="/"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full 
                      font-semibold hover:bg-gray-800 transition-colors border-2 
                      border-gray-900"
          >
            Return to Home
          </Link>
        </div>

        {/* Right Graphic */}
        <div className="hidden sm:inline-block relative w-full max-w-md">
          <div className="aspect-square bg-gray-100 rounded-full flex items-center justify-center">
            <div className="relative w-3/4 h-3/4">
              {/* Broken link illustration */}
              <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gray-900 rounded-lg"></div>
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gray-900 rounded-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-white border-8 border-gray-900 rounded-full 
                              flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900">!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFoundComponent;