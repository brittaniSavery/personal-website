export const FULL_PATH = `${process.cwd()}/content/posts`;
export const IMG_PATH = "/images/posts";
export const TAGS = ["personal", "writer", "coder", "introduction", "gamer"];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function getPublishDateDisplay(pub: Date): string {
  const pubDate = new Date(pub);
  return `${pubDate.getDate()} ${
    months[pubDate.getMonth()]
  } ${pubDate.getFullYear()}`;
}

export function sortPostsByDate(a: PostDetails, b: PostDetails): number {
  const aDate = new Date(a.publishDate);
  const bDate = new Date(b.publishDate);
  return bDate.valueOf() - aDate.valueOf();
}

export async function getPostBySlug(slug: string): Promise<PostDetails> {
  const { attributes, html } = await import("../content/posts/" + slug + ".md");

  return { ...attributes, content: html, slug: slug };
}

export async function getPosts(files: string[]): Promise<PostDetails[]> {
  const imports = files.map(
    async (file): Promise<PostDetails> => {
      const filename = file.replace(".md", "");
      return getPostBySlug(filename);
    }
  );

  return Promise.all(imports);
}

export async function getPostsByDate(files: string[]): Promise<PostDetails[]> {
  const posts = await getPosts(files);
  posts.sort((a, b) => sortPostsByDate(a, b));

  return posts;
}
