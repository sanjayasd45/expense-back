import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})
const uploadImage = async (filePath) => {
    try {
        if(!filePath) {
            return null; // Return null if no file path is provided
        }
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'Exp', // Optional: specify a folder in your Cloudinary account
            resource_type: 'outo', // Specify the resource type
        });
        
        fs.unlinkSync(filePath); // Delete the file after uploading
        return result.secure_url; // Return the URL of the uploaded image
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw new Error('Image upload failed');
    }
};