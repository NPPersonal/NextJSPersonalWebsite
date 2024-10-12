import React from "react";

export type NextJSPageProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type NextJSLayoutProps = {
  params: { [key: string]: string };
  children: React.ReactNode;
};
