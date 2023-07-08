import axios from 'axios';

export const uploadImage = async (
    file: Blob,
    signature: string,
    timestamp: number
) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('signature', signature);
    formData.append('api_key', `${process.env.CLOUDINARY_PUBLIC}`);
    formData.append('folder', 'SIP');
    formData.append('timestamp', String(timestamp));

    try {
        await axios.post(`${process.env.CLOUDINARY_URL}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    } catch (error) {
        console.error('Failed to upload image:', error);
        throw error;
    }
};
