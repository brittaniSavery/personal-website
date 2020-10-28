import React from "react";
import { getPublishDateDisplay } from "../lib/post";
import TagGroup from "./TagGroup";

type PostCardProps = {
  post: PostDetails;
};

export default function PostCard({ post }: PostCardProps): JSX.Element {
  return (
    <div className="card bsa-card">
      <div className="card-image">
        <img src={`/images/posts/${post.thumbnail}`} alt={post.thumbnailAlt} />
      </div>
      <div className="card-content">
        <h2>{post.title}</h2>
        <p>
          {getPublishDateDisplay(post.publishDate)}
          <br />
          <TagGroup tags={post.tags} />
        </p>
        <p>{post.summary}</p>
      </div>
    </div>
  );
}
