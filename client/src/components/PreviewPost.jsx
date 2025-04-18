const PreviewPost = ({ image, caption }) => {
    return (
      <div className="border rounded-lg overflow-hidden shadow-lg">
        {caption && (
          <div className="p-4 bg-white">
            <p className="text-gray-800 whitespace-pre-line">{caption}</p>
          </div>
        )}
        {image && (
        <div className="relative">
          <img
            src={image}
            alt="Post preview"
            className="w-full h-96 object-cover"
          />
        </div>)}
      </div>
    );
  };
  
  export default PreviewPost;