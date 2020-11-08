declare module "*.md";
declare module "markdown-it-attrs";

type BasicProps = {
  children?: React.ReactNode;
  className?: string;
};

type PostDetails = {
  slug: string;
  title: string;
  summary: string;
  publishDate: Date;
  tags: string[];
  thumbnail: string;
  thumbnailAlt: string;
  content: string;
};
