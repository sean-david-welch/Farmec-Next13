import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const bucketName = process.env.BUCKET_NAME;
const bucketRegions = process.env.BUCKET_REGION;
const awsAccessKey = process.env.AWS_ACCESS_KEY_ as string;
const awsSecretKey = process.env.AWS_SECRET_KEY_ as string;

const clientParams = {
    region: bucketRegions,
    credentials: {
        accessKeyId: awsAccessKey,
        secretAccessKey: awsSecretKey,
    },
};
const client = new S3Client(clientParams);

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

        const fileUrl = `https://${bucketName}.s3.${bucketRegions}.amazonaws.com/${fileName}`;
        console.log('File URL:', fileUrl);
        return fileUrl;
    } catch (error: any) {
        console.error('Error in uploadFile function:', error);
        throw error.message;
    }
}

export function deleteFile(fileName: string) {
    const deleteParams = {
        Bucket: bucketName,
        Key: fileName,
    };

    return client.send(new DeleteObjectCommand(deleteParams));
}

// export async function getObjectSignedUrl(key: string) {
//     const params = {
//         Bucket: bucketName,
//         Key: key,
//     };

//     const command = new GetObjectCommand(params);
//     const seconds = 60;
//     const url = await getSignedUrl(client, command, { expiresIn: seconds });

//     return url;
// }
