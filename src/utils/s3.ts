import { uploadData } from 'aws-amplify/storage';

export const uploadImageToS3 = async (file: File, folder: string) => {
  try {
    // Creating a unique file name
    const fileExtension = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;

    // Upload to S3
    const result = await uploadData({
      key: fileName,
      data: file,
      options: {
        contentType: file.type,
        //@ts-ignore
        accessLevel: 'public'
      }
    }).result;

    return result.key;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
