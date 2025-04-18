const Loader = ({ size = "h-16 w-16", color = "border-white" }) => {
    return (
      <div className="relative">
        {/* Outer circle */}
        <div
          className={`${size} rounded-full border-4 ${color} border-opacity-20`}
        ></div>
        
        {/* Animated spinner */}
        <div
          className={`absolute top-0 left-0 ${size} rounded-full border-4 ${color} 
                    border-t-transparent animate-spin`}
        >
          <span className="sr-only">Loading...</span>
        </div>
  
        {/* Optional center dot */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        ${size.split('w-')[1].split(' ')[0] === '16' ? 'w-3 h-3' : 'w-2 h-2'} 
                        rounded-full ${color.replace('border', 'bg')}`}></div>
      </div>
    );
  };
  
  // Full page loading overlay version
  export const FullPageLoader = () => {
    return (
      <div className="fixed inset-0 bg-opacity-80 flex items-center justify-center z-50">
        <Loader color="border-white" />
        <p className="absolute mt-32 text-white font-medium text-lg">
          Loading...
        </p>
      </div>
    );
  };