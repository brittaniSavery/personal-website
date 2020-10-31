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
