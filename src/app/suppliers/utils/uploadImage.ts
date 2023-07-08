import axios from 'axios';
import { cloudinaryConfig } from '~/lib/cloudinary';

const cloudinary_api = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL;
const cloudinary_public_key = process.env.NEXT_PUBLIC_CLOUDINARY_PUBLIC;

export const uploadImage = async (
    file: Blob,
    signature: string,
    timestamp: number
) => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('signature', signature);
    formData.append('api_key', cloudinary_public_key as string);
    formData.append('folder', 'SIP');
    formData.append('timestamp', String(timestamp));

    try {
        if (!cloudinary_api) {
            throw new Error('Missing CLOUDINARY_URL');
        }
        await axios.post(cloudinary_api, formData);
    } catch (error) {
        console.error('Failed to upload image:', error);
        throw error;
    }
};
