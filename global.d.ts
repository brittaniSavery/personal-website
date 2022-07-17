declare module "*.svg";
declare module "*.md";
declare module "markdown-it-attrs";

type BasicProps = {
  children?: React.ReactNode;
  className?: string;
};

type FieldProps = {
  id: string;
  label: string;
  error?: string;
};

type Topic = {
  id: string;
  name: string;
  description: string | null;
};

type AllMeta = GeneralMeta | PostMeta | BookMeta;

type PostMeta = Meta & {
  type: "article";
  publishDate: Date;
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
  thumbnailAlt?: string;
  url: string;
};

type PostSummary = {
  slug: string;
  title: string;
  tags: string[];
  description: string;
  publishDate: Date;
  formattedDate: string;
  thumbnail?: string;
  thumbnailAlt?: string;
};

type Post = PostSummary & {
  meta?: {
    description: string;
  };
  newsletter: string;
  content: string;
};
