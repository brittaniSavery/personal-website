import React from "react";
import { BSACard, BSACardContent, BSACardImage } from "./BSACard";
import TagGroup from "./TagGroup";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps): JSX.Element {
  return (
    <BSACard>
      <BSACardImage src={post.thumbnail} alt={post.thumbnailAlt} />
      <BSACardContent>
        <h2>{post.title}</h2>
        <p className="mb-0">{post.formattedDate}</p>
        <TagGroup tags={post.tags} />
        <p>{post.summary}</p>
      </BSACardContent>
    </BSACard>
  );
}
