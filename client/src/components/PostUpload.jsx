import { useContext, useState } from 'react';
import PreviewPost from './PreviewPost';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { FullPageLoader } from './Loader';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from './NavBar';

const PostUpload = () => {
  const [caption, setCaption] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const { backendUrl } = useContext(AppContext);
  const queryClient = useQueryClient();
  const { user } = useParams();
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.onerror = () => {
        toast.error('Error reading the image file.');
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Please upload a valid image file.');
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const mutation = useMutation({
    mutationFn: async ({ text, img }) => {
      const res = await fetch(`${backendUrl}/api/post/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, img }),
      });

      const data = await res.json();

      if (!data.Success) {
        throw new Error(data.Message);
      }

      queryClient.invalidateQueries({
        queryKey: ['userPost'],
      });
      navigate(`/${user}`);

      return data;
    },
    onSuccess: () => {
      toast.success("Post uploaded successfully");
      setImagePreview(null);
      setCaption('');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleRemoveImage = () => {
    setImagePreview(null);
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (!imagePreview) {
      return toast.error('You must upload an image');
    }
    mutation.mutate({ img: imagePreview, text: caption });
  };

  if (mutation.isPending) {
    return <FullPageLoader />;
  }

  return (
    <div>
      <NavBar/>
    <div className="max-w-2xl mx-auto p-6 shadow-md rounded-lg flex flex-col gap-3 mt-[10%] text-white">
      <form onSubmit={handlePost} className="space-y-6">
        {/* Image Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center relative">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              aria-label="Upload Image"
            />
            <div className="space-y-2">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mx-auto h-48 w-auto object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    aria-label="Remove Image"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <svg
                    className="mx-auto h-12 w-12 text-white"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-white">Click to upload a photo</p>
                </>
              )}
            </div>
          </label>
        </div>

        {/* Caption Input */}
        <div>
          <textarea
            value={caption}
            onChange={handleCaptionChange}
            placeholder="Write a caption..."
            className="w-full p-4  rounded-lg  outline-none border-[1.5px] border-white"
            rows="4"
            aria-label="Caption"
          />
        </div>

        {/* Post Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 transform focus:outline-none transition-all"
          aria-label="Post"
        >
          POST
        </button>
      </form>

      {/* Preview Component */}
      {imagePreview && <PreviewPost image={imagePreview} caption={caption} />}
    </div>
    </div>
  );
};

export default PostUpload;
