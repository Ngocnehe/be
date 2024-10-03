import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

export const CloudinaryConfig = {
  provide: 'Cloudinary',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dmsuwoosx',
      api_key: '819541955439382',
      api_secret: 'cahdIEgZoAw4zzojlokJ4GlTgz0',
    });
  },
};
