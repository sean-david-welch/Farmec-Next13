import { v2 as cloudinary } from 'cloudinary';

export const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_PUBLIC,
    api_secret: process.env.CLOUDINARY_PRIVATE,
    secure: true,
});

console.log({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_PUBLIC,
    api_secret: process.env.CLOUDINARY_PRIVATE,
});

export default cloudinary;
