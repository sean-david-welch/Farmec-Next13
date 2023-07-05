import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand,
} from '@aws-sdk/client-s3';

import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const awsAccessKey = process.env.AWS_ACCESS_KEY_ as string;
const awsSecretKey = process.env.AWS_SECRET_KEY_ as string;

const clientParams = {
    region: bucketRegion,
    credentials: {
        accessKeyId: awsAccessKey,
        secretAccessKey: awsSecretKey,
    },
};
const client = new S3Client(clientParams);

export async function generateUploadURL(bucketName: string, key: string) {
    const presignedPostData = await createPresignedPost(client, {
        Bucket: bucketName,
        Key: key,
        Expires: 3600,
    });

    const url = presignedPostData.url;

    const s3UrlBase = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com`;
    const publicUrl = `${s3UrlBase}/${key}`;

    return { presignedUrl: url, publicUrl };
}

export async function getUploadURL(key: string, bucket: string) {
    const command = new GetObjectCommand({
        Key: key,
        Bucket: bucket,
    });

    const url = await getSignedUrl(client, command, { expiresIn: 3600 });

    return url;
}

export async function uploadFile(
    fileBuffer: string | File,
    fileName: string,
    mimetype: string
) {
    try {
        const uploadParams = {
            Bucket: bucketName,
            Body: fileBuffer,
            Key: fileName,
            ContentType: mimetype,
        };
        console.log('Upload params:', uploadParams);

        console.log('File buffer:', fileBuffer, 'Size:', fileBuffer.length);
        await client.send(new PutObjectCommand(uploadParams));

        const fileUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${fileName}`;
        console.log('File URL:', fileUrl);
        return fileUrl;
    } catch (error: any) {
        console.error('Error in uploadFile function:', error);
        throw error.message;
    }
}
