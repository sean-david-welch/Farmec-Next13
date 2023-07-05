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
const s3 = new S3Client(clientParams);

export async function uploadFile(
    fileBuffer: Buffer,
    fileName: string,
    mimetype: string
) {
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype,
    };

    await s3.send(new PutObjectCommand(uploadParams));

    return `https://${bucketName}.s3.${bucketRegions}.amazonaws.com/${fileName}`;
}

export function deleteFile(fileName: string) {
    const deleteParams = {
        Bucket: bucketName,
        Key: fileName,
    };

    return s3.send(new DeleteObjectCommand(deleteParams));
}

// export async function getObjectSignedUrl(key: string) {
//     const params = {
//         Bucket: bucketName,
//         Key: key,
//     };

//     // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
//     const command = new GetObjectCommand(params);
//     const seconds = 60;
//     const url = await getSignedUrl(s3, command, { expiresIn: seconds });

//     return url;
// }
