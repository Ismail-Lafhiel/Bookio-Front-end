export interface User {
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
  isAdmin?: boolean;
  role?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  preferredUsername: string;
  birthdate: string;
}

export interface AuthContextType {
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
  isAdmin: boolean;
  checkUserRole: () => boolean;
}
