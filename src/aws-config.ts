import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "eu-north-1_IAZ0ABjbx",
      userPoolClientId: "q8rtpaf2pefv300m8nlsj4osl",

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
