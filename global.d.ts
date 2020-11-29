declare module "*.svg";
declare module "*.md";
declare module "markdown-it-attrs";

type BasicProps = {
  children?: React.ReactNode;
  className?: string;
};

type Post = {
  slug: string;
  title: string;
  summary: string;
  publishDate: Date;
  formattedDate?: string;
  tags: string[];
  thumbnail: string;
  thumbnailAlt: string;
  content: string;
};
