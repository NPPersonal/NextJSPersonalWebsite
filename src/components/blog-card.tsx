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

const dataURI =
  "data:image/png;base64,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DbJDggmBQA+BhQsXmvLQFVdcYTbhnXbaqSMgfEdx6KGH0j///ENDQ0PmPS4fHXXUUSZz4AzjlVdeoe2228581r5D4Sxh6623ppNOOonuvvtu8xmXpc4999yesbkUdtZZZ9EHH3xgBInvTviO5aeffqLLLrvMZDr8Tx7ntddeo3XXXZdOPvlkOuecczr9cIbE/XJ2UusOBCUqYSuitE25tPkKCzeY04wAl5aefvppuv76683FOG/EfI9x/PHHm3IWZyDz58+nVVdd1QzE7W6//Xazoc+YMcNcoPM9CT/vv/++eZfFgDOGdgmML7u5j6mX6CwgZ599dqeExe/NmzePFi1aRGuuuabJQh5++GGThfC3w0477TRTNuOspf2wsD3xxBO077772gsISlTNggZvg4BIApZibNlM5BSlGXXqqacaMWg/nD2svvrqRjjuueceUyJql564DQsOl5Zuvvlmc+l+wAEH0Jlnnmlef+CBB0xG8c0335g/n3LKKeYy/NdffzWbPl96dz9TBYSFgy/W+aK+/U0utu2YY44xF+W33HILvfXWW0Yw+OHfrb322uYuhbOUygyk+BJV98rpu4qwtKQtUNiTN4HcVhzfM7AwtL/Gy3cWnA2wEDz55JOmpHXffffRIYccQuedd57JRlhguNzEJTB+96abbjJt+W6EN/sPP/zQZBqcofCld/uZKiD8ex6fBYcvxlkYWLD4G1Z8uf72228bMXnqqadoww03NNkS98l3KJyJ9BUQlKjyXoCYHQiAQH0CvgVsqoDw5s/fcOJyFD98B9H+ZhV//XafffYx9yD8bLvttqYcxn8/hO9V9txzT7rrrrvMn3fccUdTquJvWLEg8MNCwxlL99d433nnHXORz//kZ7311qPHHnuMNttsM1qwYIHJYrhPflZbbTUjNJtuuqn5c0dA+DvFNn8RpT522zd9u8d23NLagXNpHg8938pkPbQBGfXPJatPPvmE5syZQ/x3MjrPUsh8oc73J1xOavws7ZP/AiM/a621lum7++Fshy/s+Y6EM4/2X1Tke5ahsbGxJXzHMXPmTPMz9eKlsYHoYBoC0jZxafbECZwyZx2HLUYRQsApyAc3Zq3guxP+Ya34P96QXB6XWFU3AAAAAElFTkSuQmCC";

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
        <div className="relative w-full h-80 my-4">
          <Image
            src={imageSrc ? imageSrc : ""}
            alt={`${title}-${guid}`}
            fill
            priority
            style={{ objectFit: "cover" }}
            placeholder={dataURI}
          />
        </div>
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
