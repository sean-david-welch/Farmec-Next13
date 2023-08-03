import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import axios from 'axios';

const region = 'eu-west-1';
const bucketName = 'farmec-bucket';
const accessKeyId = process.env.AWS_ACCESS || '';
const secretAccessKey = process.env.AWS_SECRET || '';

export const getPresignedUrl = async (fileName: string, fileType: string) => {
    const s3 = new S3Client({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });

    const params = {
        Bucket: bucketName,
        Key: fileName,
        ContentType: fileType,
    };

    const command = new PutObjectCommand(params);

    try {
        const presignedUrl = await getSignedUrl(s3, command, {
            expiresIn: 60 * 10,
        });
        return presignedUrl;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to generate pre-signed URL');
    }
};

export const uploadFileS3 = async (presignedUrl: string, file: File) => {
    try {
        const result = await axios.post(presignedUrl, file, {
            headers: {
                'Content-Type': file.type,
            },
        });

        return result;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to upload file');
    }
};
