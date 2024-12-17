import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  signIn,
  signOut,
  signUp,
  getCurrentUser,
  fetchUserAttributes,
  resetPassword,
  confirmResetPassword,
  updateUserAttributes,
} from "aws-amplify/auth";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";

interface User {
  email: string;
  given_name: string;
  family_name: string;
  preferred_username: string;
  birthdate: string;
  sub?: string;
  updated_at?: string;
  profile_pic?: string | null;
  background_pic?: string | null;
  bio?: string | null;
  social_links?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    discord?: string;
  } | null;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  preferredUsername: string;
  birthdate: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  confirmForgotPassword: (
    email: string,
    code: string,
    newPassword: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  uploadProfilePicture: (file: File) => Promise<string>;
  uploadBackgroundPicture: (file: File) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const updateUserProfile = async (data: Partial<User>) => {
    try {
      setIsLoading(true);
      setError(null);

      const updateAttributes: Record<string, string> = {};

      if (data.bio !== undefined) {
        updateAttributes["custom:bio"] = data.bio || "";
      }

      if (data.social_links !== undefined) {
        updateAttributes["custom:social_links"] = data.social_links
          ? JSON.stringify(data.social_links)
          : "";
      }

      // Update the user attributes
      await updateUserAttributes({
        userAttributes: updateAttributes,
      });

      // Refresh the user data
      await checkAuth();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Profile update failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  const checkAuth = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        const attributes = await fetchUserAttributes();

        // Parse custom attributes if they exist
        const socialLinks = attributes["custom:social_links"]
          ? JSON.parse(attributes["custom:social_links"])
          : null;

        setUser({
          email: attributes.email ?? "",
          given_name: attributes.given_name ?? "",
          family_name: attributes.family_name ?? "",
          preferred_username: attributes.preferred_username ?? "",
          birthdate: attributes.birthdate ?? "",
          sub: attributes.sub,
          updated_at: attributes.updated_at,
          profile_pic: attributes["custom:profile_pic"] || null,
          background_pic: attributes["custom:background_pic"] || null,
          bio: attributes["custom:bio"] || null,
          social_links: socialLinks,
        });
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await signIn({ username: email, password });
      await checkAuth();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);

      await signUp({
        username: data.email,
        password: data.password,
        options: {
          userAttributes: {
            email: data.email,
            given_name: data.firstName,
            family_name: data.lastName,
            preferred_username: data.preferredUsername,
            birthdate: data.birthdate,
          },
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await signOut();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await resetPassword({ username: email });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Password reset request failed"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const confirmForgotPassword = async (
    email: string,
    code: string,
    newPassword: string
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      await confirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Password reset confirmation failed"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Create S3 client with Cognito Identity Pool credentials
  const createS3Client = () => {
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

  // Utility to generate unique filename
  const generateUniqueFileName = (file: File, folder: string) => {
    const fileExtension = file.name.split(".").pop();
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    return `${folder}/${timestamp}_${randomString}.${fileExtension}`;
  };

  // Upload method for profile picture
  const uploadProfilePicture = async (file: File) => {
    try {
      // Validate environment variables
      if (
        !import.meta.env.VITE_AWS_REGION ||
        !import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID ||
        !import.meta.env.VITE_S3_BUCKET
      ) {
        throw new Error("Missing required environment variables");
      }

      setIsLoading(true);
      setError(null);

      // Generate unique filename
      const fileName = generateUniqueFileName(file, "profile-pics");

      console.log("Starting profile picture upload:", {
        bucket: import.meta.env.VITE_S3_BUCKET,
        region: import.meta.env.VITE_AWS_REGION,
        fileName,
        contentType: file.type,
      });

      // Create S3 client
      const s3Client = createS3Client();

      // Create upload command
      const uploadCommand = new PutObjectCommand({
        Bucket: import.meta.env.VITE_S3_BUCKET,
        Key: fileName,
        Body: file,
        ContentType: file.type,
      });

      // Attempt the upload
      const uploadResult = await s3Client.send(uploadCommand);
      console.log("Profile picture upload successful:", uploadResult);

      // Construct file URL
      const fileUrl = `https://${import.meta.env.VITE_S3_BUCKET}.s3.${
        import.meta.env.VITE_AWS_REGION
      }.amazonaws.com/${fileName}`;

      // Update user attributes with the S3 key
      await updateUserAttributes({
        userAttributes: {
          "custom:profile_pic": fileUrl,
        },
      });

      // Refresh user data
      await checkAuth();

      return fileUrl;
    } catch (err) {
      console.error("Profile picture upload error:", err);
      setError(
        err instanceof Error ? err.message : "Profile picture upload failed"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Similar method for background picture
  const uploadBackgroundPicture = async (file: File) => {
    try {
      // Validate environment variables
      if (
        !import.meta.env.VITE_AWS_REGION ||
        !import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID ||
        !import.meta.env.VITE_S3_BUCKET
      ) {
        throw new Error("Missing required environment variables");
      }

      setIsLoading(true);
      setError(null);

      // Generate unique filename
      const fileName = generateUniqueFileName(file, "background-pics");

      console.log("Starting background picture upload:", {
        bucket: import.meta.env.VITE_S3_BUCKET,
        region: import.meta.env.VITE_AWS_REGION,
        fileName,
        contentType: file.type,
      });

      // Create S3 client
      const s3Client = createS3Client();

      // Create upload command
      const uploadCommand = new PutObjectCommand({
        Bucket: import.meta.env.VITE_S3_BUCKET,
        Key: fileName,
        Body: file,
        ContentType: file.type,
      });

      // Attempt the upload
      const uploadResult = await s3Client.send(uploadCommand);
      console.log("Background picture upload successful:", uploadResult);

      // Construct file URL
      const fileUrl = `https://${import.meta.env.VITE_S3_BUCKET}.s3.${
        import.meta.env.VITE_AWS_REGION
      }.amazonaws.com/${fileName}`;

      // Update user attributes with the S3 key
      await updateUserAttributes({
        userAttributes: {
          "custom:background_pic": fileUrl,
        },
      });

      // Refresh user data
      await checkAuth();

      return fileUrl;
    } catch (err) {
      console.error("Background picture upload error:", err);
      setError(
        err instanceof Error ? err.message : "Background picture upload failed"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
        forgotPassword,
        confirmForgotPassword,
        updateUserProfile,
        uploadProfilePicture,
        uploadBackgroundPicture,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
