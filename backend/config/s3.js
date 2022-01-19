import S3 from 'aws-sdk/clients/s3.js';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const bucketName = process.env.AWS_BUCKET;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// Upload file to S3
export function uploadFile(file, filename) {
  const fileStream = fs.createReadStream(file);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: filename,
  };

  return s3.upload(uploadParams).promise();
}

// Downloads a file from S3
