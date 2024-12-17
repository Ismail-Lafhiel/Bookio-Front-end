import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";

const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: import.meta.env.VITE_AWS_REGION }),
    identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID!
  })
});

export const uploadImageToS3 = async (
  file: File,
  folder: string
): Promise<string> => {
  try {
    // Validate environment variables
    if (!import.meta.env.VITE_AWS_REGION || 
        !import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID || 
        !import.meta.env.VITE_S3_BUCKET) {
      throw new Error("Missing required environment variables");
    }

    // Create unique filename
    const fileExtension = file.name.split('.').pop();
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileName = `${folder}/${timestamp}_${randomString}.${fileExtension}`;

    console.log('Starting upload:', {
      bucket: import.meta.env.VITE_S3_BUCKET,
      region: import.meta.env.VITE_AWS_REGION,
      fileName,
      contentType: file.type
    });

    // Create the upload command - removed ACL
    const uploadCommand = new PutObjectCommand({
      Bucket: import.meta.env.VITE_S3_BUCKET,
      Key: fileName,
      Body: file,
      ContentType: file.type
    });

    // Attempt the upload
    const uploadResult = await s3Client.send(uploadCommand);
    console.log('Upload successful:', uploadResult);

    // Construct and return the URL
    const fileUrl = `https://${import.meta.env.VITE_S3_BUCKET}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${fileName}`;
    return fileUrl;

  } catch (error) {
    console.error('S3 Upload Error:', error);
    throw error;
  }
};
