import { CloudinaryImage } from "@cloudinary/url-gen";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { auto, autoEco } from "@cloudinary/url-gen/qualifiers/quality";

const getCloudinaryImage = (publicId: string) => {
  return new CloudinaryImage(publicId, {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  })
    .delivery(quality(autoEco()))
    .delivery(format(auto()));
};

export { getCloudinaryImage };
