import React from "react";
import { getPublishDateDisplay } from "../lib/post";
import { BSACard, BSACardContent, BSACardImage } from "./BSACard";
import TagGroup from "./TagGroup";

type PostCardProps = {
  post: PostDetails;
};

export default function PostCard({ post }: PostCardProps): JSX.Element {
  return (
    <BSACard>
      <BSACardImage
        src={`/images/posts/${post.thumbnail}`}
        alt={post.thumbnailAlt}
      />
      <BSACardContent>
        <h2>{post.title}</h2>
        <p className="mb-0">{getPublishDateDisplay(post.publishDate)}</p>
        <TagGroup tags={post.tags} />
        <p>{post.summary}</p>
      </BSACardContent>
    </BSACard>
  );
}
