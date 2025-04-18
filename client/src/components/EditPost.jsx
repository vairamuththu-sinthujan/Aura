import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const EditPost = ({ isOpen, onClose, postId, text }) => {
  const [comment, setComment] = useState('');
  const {backendUrl, myData} = useContext(AppContext)
  const queryClient = useQueryClient()

  const editPostMutation = useMutation({
      mutationFn: async ({postId:postId, editText:editText, userName:userName}) => {
        const res = await fetch(`${backendUrl}/api/post/edit/${postId}`, {
          credentials: "include",
          method: "PUT",
          body: JSON.stringify({
            editText,
            userName
          }),
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
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })


  const handleSubmit = (e) => {
    e.preventDefault();
    editPostMutation.mutate({postId:postId, editText:comment, userName:myData.name})
    setComment('');
    onClose();
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className=" bg-black rounded-lg p-6 w-full max-w-md relative border-2 border-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-400 transition-colors"
        >
          <FiX size={24} />
        </button>

        {/* Comment Form */}
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={text}
            className="w-full h-32 p-3 border rounded-lg resize-none focus:outline-none"
            required
          />
          
          <div className="mt-4 flex justify-end gap-3">
            {/* <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button> */}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Submit Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;