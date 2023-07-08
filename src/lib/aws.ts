import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand,
} from '@aws-sdk/client-s3';

import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const bucketName = process.env.BUCKET_NAME;
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

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
};

export async function generateUploadURL(bucketName: string, key: string) {
    const presignedPostData = await createPresignedPost(client, {
        Bucket: bucketName,
        Key: key,
        Expires: 3600,
    });

    console.log('presignedPostData:', presignedPostData);

    const url = presignedPostData.url;

    console.log('url:', url);

    const s3UrlBase = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com`;
    const publicUrl = `${s3UrlBase}/${key}`;

    console.log('publicUrl:', publicUrl);

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
