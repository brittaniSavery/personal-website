import Link from "next/link";
import { BSACard, BSACardContent, BSACardImage } from "../projects/BSACard";
import TagGroup from "./TagGroup";

type PostCardProps = {
  post: PostSummary;
};

export default function PostCard({ post }: PostCardProps): JSX.Element {
  return (
    <BSACard>
      <BSACardImage src={post.thumbnail} alt={post.thumbnailAlt} />
      <BSACardContent>
        <h2>
          <Link href={`/post/${post.slug}`}>
            <a className="has-text-primary">{post.title}</a>
          </Link>
        </h2>
        <p className="mb-0">{post.formattedDate}</p>
        <TagGroup tags={post.tags} />
        <p>{post.description}</p>
      </BSACardContent>
    </BSACard>
  );
}
