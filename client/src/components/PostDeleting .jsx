import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const PostDeleting = ({message}) => {
  return (
    <div className="flex items-center justify-center h-full">
      <FaSpinner className="animate-spin text-4xl text-white" />
      <p className="ml-2 text-white">{message}</p>
    </div>
  );
};

export default PostDeleting;
