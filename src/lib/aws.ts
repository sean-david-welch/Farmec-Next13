import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand,
} from '@aws-sdk/client-s3';
import multer from 'multer';

const bucketName = process.env.BUCKET_NAME;
const bucketRegions = process.env.BUCKET_REGION;
const awsAccessKey = process.env.AWS_ACCESS_KEY as string;
const awsSecretKey = process.env.AWS_SECRET_KEY as string;

const s3 = new S3Client({
    region: bucketRegions,
    credentials: {
        accessKeyId: awsAccessKey,
        secretAccessKey: awsSecretKey,
    },
});

const exampleCode = async () => {
    const params = {
        Bucket: bucketName,
        Key: 'test.txt',
        Body: 'Hello World',
        ContentType: 'text/plain',
    };

    const command = new PutObjectCommand(params);

    // Get signed url

    await s3.send(command);
};
