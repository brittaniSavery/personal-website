export const MAIN_DIRECTORY = `${process.cwd()}/content/posts`;
export const IMG_DIRECTORY = "/images/posts";
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

export async function getPosts(files: string[]): Promise<PostDetails[]> {
  const imports = files.map(
    async (file): Promise<PostDetails> => {
      const filename = file.replace(".md", "");
      const { attributes } = await import(
        "../content/posts/" + filename + ".md"
      );

      return { ...attributes, slug: filename };
    }
  );

  return Promise.all(imports);
}

export function sortPostsByDate(a: PostDetails, b: PostDetails): number {
  const aDate = new Date(a.publishDate);
  const bDate = new Date(b.publishDate);
  return bDate.valueOf() - aDate.valueOf();
}
