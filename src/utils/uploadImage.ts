import axios from 'axios';

const cloudinary_api = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL;
const cloudinary_public_key = process.env.NEXT_PUBLIC_CLOUDINARY_PUBLIC;

export const uploadImage = async (
    file: Blob,
    signature: string,
    timestamp: number,
    filename: string,
    folder: string,
    resourceType?: string
) => {
    const imageFormData = new FormData();
    const filePublicId = filename.split('.').slice(0, -1).join('.');

    if (!(file instanceof File)) {
        file = new File([file], filename);
    }

    imageFormData.append('public_id', filePublicId);
    imageFormData.append('folder', folder);
    imageFormData.append('timestamp', String(timestamp));
    imageFormData.append('api_key', cloudinary_public_key as string);
    imageFormData.append('signature', signature);
    imageFormData.append('file', file);
    if (resourceType) {
        imageFormData.append('resource_type', resourceType);
    }

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
