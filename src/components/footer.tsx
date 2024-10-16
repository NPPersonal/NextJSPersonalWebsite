import React from "react";
import logoImage from "../../public/static/images/logo.svg";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FooterProps extends React.ComponentProps<"footer"> {}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ ...props }, ref) => {
    return (
      <footer ref={ref} {...props}>
        <Image
          className="m-4 w-16 h-16 xl:w-36 xl:h-36"
          src={logoImage}
          alt="logo"
        />
      </footer>
    );
  }
);

Footer.displayName = "Footer";

export default Footer;
