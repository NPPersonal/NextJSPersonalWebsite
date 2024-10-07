import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { Badge } from "./ui/badge";

export interface BlogCardProps extends React.ComponentProps<typeof Card> {
  guid: string;
  avatarImageSrc?: string | undefined;
  title: string;
  pubDate: string;
  imageSrc?: string | undefined;
  blogContent: React.ReactNode | string;
  tags?: Array<string> | undefined;
}

const BlogCard = React.forwardRef<typeof Card, BlogCardProps>(
  (
    {
      guid,
      avatarImageSrc = undefined,
      title,
      pubDate,
      imageSrc = undefined,
      blogContent,
      tags = undefined,
      ...props
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref
  ) => {
    return (
      <Card {...props}>
        <div className="flex items-center mx-4">
          <Avatar>
            <AvatarImage src={avatarImageSrc} />
          </Avatar>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{pubDate}</CardDescription>
          </CardHeader>
        </div>
        {imageSrc ? (
          <div className="relative w-full h-[200px] my-4">
            <Image
              src={imageSrc}
              alt={`${title}-${guid}`}
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : null}
        {tags ? (
          <div className="flex flex-wrap items-center my-4 mx-2">
            {tags.map((tag, i) => {
              return (
                <Badge className="m-2" key={`${tag}-${i}`}>
                  {tag}
                </Badge>
              );
            })}
          </div>
        ) : null}
        <CardContent>{blogContent}</CardContent>
      </Card>
    );
  }
);

BlogCard.displayName = "BlogCard";

export default BlogCard;
