import React from "react";

const rss2jsonUrl = "https://api.rss2json.com/v1/api.json?rss_url=";
const mediumFeedUrl = "https://medium.com/feed/@";

export type BlogFeed = {
  url: string;
  title: string;
  link: string;
  author: string;
  description: string;
  image: string;
};
export type BlogItem = {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  enclosure: { [key: string]: string };
  categories: Array<string>;
};

export const useMediumRSS = () => {
  const [feed, setFeed] = React.useState<BlogFeed | undefined>(undefined);
  const [items, setItems] = React.useState<Array<BlogItem>>([]);
  const [fetching, setFetching] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | undefined>(undefined);
  /** Extract first thumbnail url from post content */
  const thumbnailURLFromContent = (content: string) => {
    if (content) {
      const result = /(?=https)(.*?)(?=">)/.exec(content);
      if (result) {
        return result[0];
      }
    }
    return undefined;
  };
  const datetimeToDate = (datetime: string) => {
    const newDateTime = new Date(datetime);
    return newDateTime.toDateString();
  };
  const htmlToText = (
    htmlString: string,
    extractStart: number | undefined = undefined,
    extractEnd: number | undefined = undefined,
    suffix: string = "....."
  ) => {
    if (typeof document !== "undefined" && htmlString) {
      const div = document.createElement("div");
      div.innerHTML = htmlString;
      let text = div.textContent || div.innerText || "";
      if (extractStart !== undefined && extractEnd !== undefined) {
        text = text.substring(extractStart, extractEnd) + suffix;
      }
      return text;
    }
    return "";
  };

  const getRSSFeed = async (username: string) => {
    try {
      setFetching(true);
      const response = await fetch(`${rss2jsonUrl}${mediumFeedUrl}${username}`);
      const data = await response.json();
      setFeed(data["feed"]);
      setItems(data["items"]);
      setError(undefined);
    } catch {
      setError(new Error("Somehting went wrong while fetching blog data"));
    } finally {
      setFetching(false);
    }
  };

  return {
    feed,
    items,
    fetching,
    error,
    getRSSFeed,
    thumbnailURLFromContent,
    htmlToText,
    datetimeToDate,
  };
};
