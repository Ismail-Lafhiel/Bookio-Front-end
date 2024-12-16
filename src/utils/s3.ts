import { uploadData } from "aws-amplify/storage";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUser } from "aws-amplify/auth";

const bucket = import.meta.env.VITE_S3_BUCKET;

export const uploadImageToS3 = async (
  file: File,
  type: "profile_pic" | "background_pic"
): Promise<string> => {
  try {
    // Get the current user to use their ID in the file path
    const user = await getCurrentUser();

    // Generate a unique filename with user ID and timestamp
    const uniqueFileName = `${type}/${
      user.username
    }-${uuidv4()}${getFileExtension(file)}`;

    // Upload the file to S3
    const result = await uploadData({
      key: uniqueFileName,
      data: file,
      options: {
        //@ts-ignore
        accessLevel: "public",
        contentType: file.type,
        metadata: {
          uploadedBy: user.username,
          uploadType: type,
        },
      },
    }).result;

    return result.key;
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw new Error("Image upload failed");
  }
};

// Helper function to get file extension
const getFileExtension = (file: File) => {
  return file.name.slice(file.name.lastIndexOf(".")) || "";
};

export const getS3ImageUrl = (key: string) => {
  return `https://${bucket}.s3.amazonaws.com/${key}`;
};
