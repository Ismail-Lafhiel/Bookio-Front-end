import { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaDiscord,
  FaCamera,
} from "react-icons/fa";

const Profile = () => {
  const { user, updateUserProfile, isLoading, uploadImage } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const backgroundInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    bio: user?.bio || "",
    profile_pic: user?.profile_pic || "",
    background_pic: user?.background_pic || "",
    social_links: user?.social_links || {
      twitter: "",
      facebook: "",
      instagram: "",
      discord: "",
    },
  });

  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return (first + last).toUpperCase();
  };

  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return `hsl(${h}, 70%, 50%)`;
  };

  const handleImageUpload = async (
    file: File,
    type: "profile_pic" | "background_pic"
  ) => {
    try {
      setIsUploading(true);
      const urlString = await uploadImage(file, type);
      setFormData((prev) => ({
        ...prev,
        [type]: urlString,
      }));
    } catch (error) {
      console.error("Upload error:", error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to upload image. Please try again.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile_pic" | "background_pic"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await handleImageUpload(file, type);
    } catch (error) {
      console.error("File change error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfile({
        bio: formData.bio,
        social_links: formData.social_links,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("social_")) {
      const social = name.split("_")[1];
      setFormData((prev) => ({
        ...prev,
        social_links: {
          ...prev.social_links,
          [social]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Background Image */}
      <div className="h-64 w-full bg-cover bg-center relative">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-300"
          style={{
            backgroundImage: `url(${
              formData.background_pic || "/public/background_placeholder.jpg"
            })`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        {isEditing && (
          <>
            <input
              type="file"
              ref={backgroundInputRef}
              onChange={(e) => handleFileChange(e, "background_pic")}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => backgroundInputRef.current?.click()}
              disabled={isUploading}
              className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
            >
              {isUploading ? (
                <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
              ) : (
                <FaCamera
                  className="text-gray-600 dark:text-gray-300"
                  size={18}
                />
              )}
            </button>
          </>
        )}
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5">
            <div className="relative">
              <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg transition-all duration-300">
                {formData.profile_pic ? (
                  <img
                    src={formData.profile_pic}
                    alt="Profile"
                    className="h-full w-full object-cover transition-all duration-300"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      setFormData((prev) => ({ ...prev, profile_pic: "" }));
                    }}
                  />
                ) : (
                  <div
                    className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark text-white text-xl font-bold transition-all duration-300"
                    style={{
                      backgroundColor: stringToColor(
                        `${user?.given_name} ${user?.family_name}`
                      ),
                    }}
                  >
                    {getInitials(user?.given_name, user?.family_name)}
                  </div>
                )}
              </div>
              {isEditing && (
                <>
                  <input
                    type="file"
                    ref={profileInputRef}
                    onChange={(e) => handleFileChange(e, "profile_pic")}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => profileInputRef.current?.click()}
                    disabled={isUploading}
                    className="absolute bottom-0 right-0 bg-primary p-1.5 rounded-full text-white shadow-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105"
                  >
                    {isUploading ? (
                      <div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <FaCamera size={14} />
                    )}
                  </button>
                </>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-xl font-bold dark:text-white">
                {user?.given_name} {user?.family_name}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                @{user?.preferred_username}
              </p>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 shadow-md text-sm font-medium"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Profile Form/Info */}
          {isEditing ? (
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows={4}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Social Links
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(formData.social_links).map(
                    ([platform, url]) => (
                      <div key={platform} className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                          {platform}
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {platform === "twitter" && (
                              <FaTwitter className="text-gray-400" />
                            )}
                            {platform === "facebook" && (
                              <FaFacebook className="text-gray-400" />
                            )}
                            {platform === "instagram" && (
                              <FaInstagram className="text-gray-400" />
                            )}
                            {platform === "discord" && (
                              <FaDiscord className="text-gray-400" />
                            )}
                          </div>
                          <input
                            type="text"
                            name={`social_${platform}`}
                            value={url}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder={`Your ${platform} URL`}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-6 space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Bio
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {formData.bio || "No bio added yet"}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Social Links
                </h3>
                <div className="flex space-x-4">
                  {Object.entries(formData.social_links).map(
                    ([platform, url]) => {
                      if (!url) return null;

                      let Icon;
                      switch (platform) {
                        case "twitter":
                          Icon = FaTwitter;
                          break;
                        case "facebook":
                          Icon = FaFacebook;
                          break;
                        case "instagram":
                          Icon = FaInstagram;
                          break;
                        case "discord":
                          Icon = FaDiscord;
                          break;
                        default:
                          return null;
                      }

                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors duration-300"
                        >
                          <Icon size={24} />
                        </a>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
