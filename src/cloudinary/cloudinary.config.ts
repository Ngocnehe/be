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
      cloud_name: 'dl13c9cbq',
      api_key: '961994793696782',
      api_secret: 'AwbocsmWL4YEGURC03FjL1Pdfu4',
    });
  },
};
