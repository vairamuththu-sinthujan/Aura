import { v2 as cloudinary } from 'cloudinary';

const cloudinaryConfig = () => {
    // Configuration
    try {
        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        console.log("cloudinary connected")
    } catch (error) {
        console.log(error.message)
    }

};


export default cloudinaryConfig