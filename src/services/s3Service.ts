import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";

export const createS3Client = () => {
  return new S3Client({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({
        region: import.meta.env.VITE_AWS_REGION,
      }),
      identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID!,
    }),
  });
};

export const generateUniqueFileName = (file: File, folder: string) => {
  const fileExtension = file.name.split(".").pop();
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  return `${folder}/${timestamp}_${randomString}.${fileExtension}`;
};

export const deleteFile = async (fileUrl: string) => {
  const s3Client = createS3Client();
  const fileName = fileUrl.split("/").slice(-2).join("/");

  if (!fileName) {
    throw new Error("Invalid file URL");
  }

  const deleteCommand = new DeleteObjectCommand({
    Bucket: import.meta.env.VITE_S3_BUCKET,
    Key: fileName,
  });

  await s3Client.send(deleteCommand);
};
