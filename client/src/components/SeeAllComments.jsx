import { FiX } from "react-icons/fi";
import images from "../assets/assets";
import { useNavigate } from "react-router-dom";

const SeeAllComments = ({ isOpen, onClose, comments }) => {

  const navigate = useNavigate()

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-black rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col border-2 border-white p-4">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Comments</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-400 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4">
          {comments?.length === 0 ? (
            <p className="text-white text-center">No comments yet</p>
          ) : (
            comments?.map((comment) => (
              <div key={comment._id} className="mb-4 last:mb-0">
                <div className="flex items-start gap-3">
                  <img
                    src={comment.profilePic || images.heroimgone}
                    alt={comment.user}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium cursor-pointer"
                      onClick={() => navigate(`/${comment.user}`)}
                      >
                        {comment.user}
                      </h3>
                      {/* <span className="text-white text-sm">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span> */}
                    </div>
                    <p className="text-white mt-1">{comment.text}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SeeAllComments;