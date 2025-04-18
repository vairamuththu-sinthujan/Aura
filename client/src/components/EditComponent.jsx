import React, { useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { FullPageLoader } from './Loader';
import { useNavigate } from 'react-router-dom';

const EditComponent = () => {
  const navigate = useNavigate();
  const {backendUrl,myData} = useContext(AppContext)
  const queryClient = useQueryClient()
  const [profImage, setProfImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [password, setPassword] = useState(null);
  const [bio, setBio] = useState(null);

  const handleProfImageUpload = (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfImage(reader.result);
        };
        reader.onerror = () => {
          toast.error('Error reading the image file.');
        };
        reader.readAsDataURL(file);
      } else {
        setProfImage(null);
      }
    };

    const handleCovImageUpload = (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCoverImage(reader.result);
        };
        reader.onerror = () => {
          toast.error('Error reading the image file.');
        };
        reader.readAsDataURL(file);
      } else {
        setCoverImage(null);
      }
    };
  
  

  const mutation = useMutation({
    mutationFn: async ({proImg,coverImg,fullname,password,bio}) => {
      const res = await fetch(`${backendUrl}/api/users/me/edit`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({proImg,coverImg,fullname,password,bio})
      })
      const data = await res.json()

      if (data.Success == false) {
        throw new Error(data.Message)
      }
      queryClient.invalidateQueries({
        queryKey: ["authUser"]
      })
      return data
    },
    onSuccess: () => {
      setProfImage(null);
      setCoverImage(null);
      setFullName(null);
      setPassword(null);
      setBio(null);
      toast.success("updated successfully")
      navigate(`/${myData.name}`)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({proImg:profImage,coverImg:coverImage,fullname:fullName,password:password,bio:bio})
  }

  if (mutation.isPending){
    return (
      <FullPageLoader/>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 shadow-md rounded-lg text-white">
      <form className="space-y-6 " onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          <label className="block">Full Name</label>
          <input
            type="text"
            name="fullName"
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-4 border rounded-lg outline-none"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block">Bio</label>
          <textarea
            name="bio"
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-4 border rounded-lg outline-none"
            rows="4"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleCovImageUpload}
            name="profileImage"
            aria-label="Upload ProfImage"
            className="w-full p-4 border rounded-lg outline-none"
          />
          {/*{formData.coverImage && (
            <img
              src={""}
              alt="Cover Preview"
              className="w-full h-48 object-cover rounded-lg mt-2"
            />
          )}*/}
        </div>

        {/* Profile Image */}
        <div>
          <label className="block">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfImageUpload}
            name="profileImage"
            aria-label="Upload ProfImage"
            className="w-full p-4 border rounded-lg outline-none"
          />
          {/*{formData.profileImage && (
            <img
              alt="Profile Preview"
              className="w-32 h-32 object-cover rounded-full mt-2"
            />
          )}*/}
        </div>
        {/*password*/}
        <div>
          <label className="block">password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            className="w-full p-4 border rounded-lg outline-none"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg outline-none"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditComponent;
