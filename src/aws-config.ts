import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "eu-north-1_usIFKFG5g",
      userPoolClientId: "5o3pvrps7kqnd1g556qo82ukgm",

      region: "eu-north-1",
      signUpVerificationMethod: "code",
      loginWith: {
        email: true,
        username: false,
        phone: false,
      },
      userAttributes: {
        email: {
          required: true,
          // @ts-ignore
          mutable: true,
        },
        name: {
          required: true,
          // @ts-ignore
          mutable: true,
        },
      },
    },
  },
});
