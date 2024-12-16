import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "eu-north-1_bvJD7pDZA",
      userPoolClientId: "5vnrcqh5s4i4463l1qcvdu0d62",
      signUpVerificationMethod: "code",
      loginWith: {
        email: true,
        username: false,
        phone: false,
      },
    },
  },
  Storage: {
    S3: {
      bucket: 'bookio-img-upload', //bucket name
      region: 'eu-north-1',
    }
  },
  // @ts-ignore
  region: "eu-north-1",
});
