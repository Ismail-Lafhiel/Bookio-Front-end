import { Amplify } from "aws-amplify";

const region = import.meta.env.VITE_AWS_REGION;
const bucket = import.meta.env.VITE_S3_BUCKET;

// console.log("Amplify Configuration:", { region, bucket });

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
      //@ts-ignore
      region: region,
    },
  },
  Storage: {
    S3: {
      bucket: bucket,
      region: region,
    },
  },
});