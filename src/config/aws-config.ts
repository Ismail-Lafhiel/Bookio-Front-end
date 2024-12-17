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
  region: "eu-north-1",
});
