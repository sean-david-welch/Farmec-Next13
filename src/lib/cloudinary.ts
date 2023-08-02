import { v2 as cloudinary } from 'cloudinary';

export const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_PUBLIC,
    api_secret: process.env.CLOUDINARY_PRIVATE,
    secure: true,
});

export const getCloudinaryUrl = async (
    file: string,
    folder: string
): Promise<{ url: string; signature: string; timestamp: number }> => {
    if (!file) {
        throw new Error('Missing file');
    }

    const publicId = file.split('.').slice(0, -1).join('.');
    const timestamp = Math.round(new Date().getTime() / 1000);

    if (!cloudinaryConfig.api_secret) {
        throw new Error('Missing credentials for cloudinary');
    }

    const signature = cloudinary.utils.api_sign_request(
        {
            public_id: publicId,
            folder: folder,
            timestamp: timestamp,
        },
        cloudinaryConfig.api_secret
    );

    const url = cloudinary.url(`${folder}/${publicId}`);

    return {
        url: url,
        signature: signature,
        timestamp: timestamp,
    };
};

export const deleteFromCloudinary = async (
    public_id: string
): Promise<{ result: string }> => {
    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result !== 'ok') {
        throw new Error('Error deleting image from cloudinary');
    }

    return {
        result: result,
    };
};

export default cloudinary;
