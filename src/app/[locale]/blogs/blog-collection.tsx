"use client";
import BlogCard from "@/components/blog-card";
import LoadingIcon from "@/components/motion/loading-icon";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

import { useMediumRSS } from "@/hooks/use-medium-rss";
import { useFormatter, useTranslations } from "next-intl";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BlogCollectionProps extends React.ComponentProps<"div"> {}

const BlogCollection = React.forwardRef<HTMLDivElement, BlogCollectionProps>(
  ({ ...props }, ref) => {
    const t = useTranslations("BlogPage");
    const formatter = useFormatter();
    const {
      feed,
      items,
      fetching,
      error,
      getRSSFeed,
      thumbnailURLFromContent,
      htmlToText,
    } = useMediumRSS();
    const openLink = (link: string | undefined) => {
      if (link) {
        window.open(link, "_blank");
      }
    };
    React.useEffect(() => {
      getRSSFeed("tomneo2004");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (error) {
      <div className="flex justify-center items-center text-destructive">
        <Typography className="text-lg" variant="strong">
          {t("blog_fetch_error")}
        </Typography>
      </div>;
    }

    if (fetching) {
      return (
        <div className="flex flex-col w-full justify-center items-center">
          <LoadingIcon />
          <Typography className="pt-4 text-lg" variant="strong">
            {t("load_blog_data")}
          </Typography>
        </div>
      );
    }
    return (
      <div ref={ref} className="flex flex-col items-center" {...props}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
          {items.length === 0
            ? null
            : items.map((item) => {
                //extract thumnail url from post content
                const thumbnailURL = thumbnailURLFromContent(item.content);

                //extract short text from content which is html string
                const shortContent = htmlToText(item.content, 0, 400, " .....");

                //convert date time to locale
                const localeDateTime = formatter.dateTime(
                  new Date(item.pubDate),
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                );
                return (
                  <div
                    key={`${item.guid}`}
                    className="flex justify-center items-start"
                  >
                    <a
                      onClick={() => openLink(item.link)}
                      className="w-full cursor-pointer hover:z-[1] hover:scale-110 transition-all duration-75"
                    >
                      <BlogCard
                        guid={item.guid}
                        title={item.title}
                        pubDate={localeDateTime}
                        blogContent={
                          <Typography variant="p">{shortContent}</Typography>
                        }
                        avatarImageSrc={feed?.image}
                        imageSrc={thumbnailURL}
                        tags={item.categories}
                      />
                    </a>
                  </div>
                );
              })}
        </div>
        {!error && !fetching && items.length > 0 ? (
          <Button className="mt-8" onClick={() => openLink(feed?.link)}>
            <Typography>{t("see_more_blogs")}</Typography>
          </Button>
        ) : null}
      </div>
    );
  }
);

BlogCollection.displayName = "BlogCollection";

export default BlogCollection;
