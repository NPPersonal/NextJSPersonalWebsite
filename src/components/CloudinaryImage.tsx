"use client";
import { getCloudinaryImage } from "@/lib/cloudinary";
import {
  AdvancedImage,
  lazyload,
  placeholder,
  responsive,
} from "@cloudinary/react";
import React from "react";

export interface CloudinaryImageProps extends React.ComponentProps<"div"> {
  publicImageId: string;
  imageStyle?: { [key: string]: string };
}
const CloudinaryImage = React.forwardRef<
  HTMLDivElement,
  CloudinaryImageProps
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ publicImageId, imageStyle, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      <AdvancedImage
        style={imageStyle ? imageStyle : {}}
        cldImg={getCloudinaryImage(publicImageId)}
        plugins={[
          lazyload(),
          responsive({ steps: 100 }),
          placeholder({ mode: "blur" }),
        ]}
      />
    </div>
  );
});

CloudinaryImage.displayName = "CloudinaryImage";

export default CloudinaryImage;
