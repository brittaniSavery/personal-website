/* eslint-disable @typescript-eslint/no-var-requires */
export const FULL_PATH = `${process.cwd()}/content/posts`;
const IMG_PATH = "/images/posts";

export function getPublishDateDisplay(pub: Date): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
  return formatter.format(new Date(pub));
}

export function sortPostsByDate(a: Post, b: Post): number {
  const aDate = new Date(a.publishDate);
  const bDate = new Date(b.publishDate);
  return bDate.valueOf() - aDate.valueOf();
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const { attributes, html } = await import("../content/posts/" + slug + ".md");

  const post: Post = { ...attributes, content: html, slug: slug };
  post.formattedDate = getPublishDateDisplay(post.publishDate);
  post.thumbnail = post.thumbnail
    ? `${IMG_PATH}/${post.thumbnail}`
    : "https://via.placeholder.com/940x534.jpg";

  return post;
}

export async function getPosts(): Promise<Post[]> {
  const fs = require("fs");
  const files = fs.readdirSync(FULL_PATH);
  const imports = files.map(
    async (file): Promise<Post> => {
      const filename = file.replace(".md", "");
      return getPostBySlug(filename);
    }
  );

  return Promise.all(imports);
}

export async function getPostsByDate(): Promise<Post[]> {
  const posts = await getPosts();
  posts.sort((a, b) => sortPostsByDate(a, b));

  return posts;
}

export async function getRelatedPosts(current: Post): Promise<Post[]> {
  const posts = await getPostsByDate();
  return posts
    .filter((post) => {
      //must don't be current post
      if (post.slug === current.slug) return false;

      const tagRelated = post.tags
        .map((tag) => current.tags.includes(tag))
        .reduce((allTags, currentTag) => allTags || currentTag);
      return tagRelated;
    })
    .slice(0, 2);
}
