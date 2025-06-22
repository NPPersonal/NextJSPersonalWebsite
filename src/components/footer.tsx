import React from "react";
import logoImage from "../../public/static/images/logo.svg";
import Image from "next/image";
import {
  getAboutMe,
  getBlogs,
  getContacts,
  getProjects,
} from "@/lib/site-routes";
import { Typography } from "./ui/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FooterProps extends React.ComponentProps<"footer"> {}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  async ({ className, ...props }, ref) => {
    const blogs = await getBlogs();
    const projects = await getProjects();
    const about = await getAboutMe();
    const contact = await getContacts();
    const cls = cn(
      "mx-8 mb-4 border-t-2 border-foreground flex flex-col sm:flex-row items-center sm:items-start",
      className
    );
    return (
      <footer className={cls} ref={ref} {...props}>
        <Image
          className="m-4 w-16 h-16 xl:w-36 xl:h-36"
          src={logoImage}
          alt="logo"
          priority
        />
        <div className="grow-[1] mt-4 flex flex-col sm:flex-row sm:items-start justify-evenly">
          <div className="mb-4 sm:mb-0">
            {blogs.metadata && (
              <Link
                className="hover:underline underline-offset-4 decoration-2"
                href={blogs.metadata.route}
              >
                <Typography variant="strong">{blogs.name}</Typography>
              </Link>
            )}
          </div>
          <div className="flex flex-col mb-4 sm:mb-0">
            {projects.children &&
              projects.children.map((route, i) => {
                const metadata = route.metadata ? route.metadata : undefined;
                const name = route.name;
                if (metadata) {
                  return (
                    <Link
                      className="hover:underline underline-offset-4 decoration-2"
                      key={`${route.name}-${i}`}
                      href={metadata.route}
                    >
                      <Typography variant="strong">{name}</Typography>
                    </Link>
                  );
                } else {
                  return null;
                }
              })}
          </div>
          <div className="mb-4 sm:mb-0">
            {about.metadata && (
              <Link
                className="hover:underline underline-offset-4 decoration-2"
                href={about.metadata.route}
              >
                <Typography variant="strong">{about.name}</Typography>
              </Link>
            )}
          </div>
          <div className="flex flex-col mb-4 sm:mb-0">
            {contact.children &&
              contact.children.map((route, i) => {
                const metadata = route.metadata ? route.metadata : undefined;
                const name = route.name;
                if (metadata) {
                  return (
                    <Link
                      className="hover:underline underline-offset-4 decoration-2"
                      key={`${route.name}-${i}`}
                      href={metadata.route}
                    >
                      <Typography variant="strong">{name}</Typography>
                    </Link>
                  );
                } else {
                  return null;
                }
              })}
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = "Footer";

export default Footer;
