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

      // Handle each field type appropriately
      if (data.profile_pic !== undefined) {
        updateAttributes["custom:profile_pic"] = data.profile_pic || "";
      }

      if (data.background_pic !== undefined) {
        updateAttributes["custom:background_pic"] = data.background_pic || "";
      }

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
            updated_at: String(Math.floor(Date.now() / 1000)),
          },
          autoSignIn: true,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
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
      setError(err instanceof Error ? err.message : "Password reset failed");
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
        newPassword: newPassword,
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

  const logout = async () => {
    try {
      setIsLoading(true);
      await signOut();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed");
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
