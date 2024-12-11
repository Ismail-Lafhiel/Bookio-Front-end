// @ts-ignore
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      //required
      userPoolId: 'eu-north-1_IAZ0ABjbx',
      userPoolClientId: '55rpd0d2pl13cbmplb4qa26vva',
      
      // optional
      region: 'eu-north-1',
      signUpVerificationMethod: 'code',
      loginWith: {
        email: true,
        username: false,
        phone: false
      },
      userAttributes: {
        email: {
          required: true,
          // @ts-ignore
          mutable: true
        },
        name: {
          required: true,
          // @ts-ignore
          mutable: true
        }
      }
    }
  }
});
