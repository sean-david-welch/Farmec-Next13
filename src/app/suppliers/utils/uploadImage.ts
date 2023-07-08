import axios from 'axios';

const cloudinary_api = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL;
const cloudinary_public_key = process.env.NEXT_PUBLIC_CLOUDINARY_PUBLIC;

export const uploadImage = async (
    file: Blob,
    signature: string,
    timestamp: number,
    filename: string
) => {
    const imageFormData = new FormData();

    // Convert Blob to File if necessary
    if (!(file instanceof File)) {
        file = new File([file], filename);
    }

    imageFormData.append('file', file);
    imageFormData.append('signature', signature);
    imageFormData.append('api_key', cloudinary_public_key as string);
    imageFormData.append('folder', 'SIP');
    imageFormData.append('timestamp', String(timestamp));
    imageFormData.append('public_id', file.name);

    let formDataEntries = Array.from(imageFormData.entries());
    console.log('imageFormData:', formDataEntries);

    console.log('filename:', file.name);

    try {
        if (!cloudinary_api) {
            throw new Error('Missing cloudinary api url');
        }
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        await axios.post(cloudinary_api, imageFormData, config);
    } catch (error) {
        console.error('Failed to upload image:', error);
        throw error;
    }
};
