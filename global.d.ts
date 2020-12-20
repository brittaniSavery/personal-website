declare module "*.svg";
declare module "*.md";
declare module "markdown-it-attrs";

type BasicProps = {
  children?: React.ReactNode;
  className?: string;
};

type AllMeta = GeneralMeta | PostMeta | BookMeta;

type PostMeta = Meta & {
  type: "article";
  publishDate: string;
};

type BookMeta = Meta & {
  type: "books.book";
  isbn: string;
};

type GeneralMeta = Meta & {
  type: "website";
};

type Meta = {
  title: string;
  fullTitle?: string;
  description: string;
  thumbnail?: string;
  url: string;
};

type Post = {
  slug: string;
  title: string;
  description: string;
  publishDate: Date;
  formattedDate?: string;
  tags: string[];
  thumbnail: string;
  thumbnailAlt: string;
  content: string;
};
