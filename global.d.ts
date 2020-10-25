declare module "*.md";

type PostDetails = {
  slug: string;
  title: string;
  summary: string;
  publishDate: Date;
  tags: string[];
  thumbnail: string;
  thumbnailAlt: string;
};
