import React from "react";
import { getPublishDateDisplay } from "../lib/post";

type Props = {
  post: PostDetails;
};

export default function PostCard({ post }: Props): JSX.Element {
  return (
    <div className="card">
      <div className="card-image">
        <img src={`/images/posts/${post.thumbnail}`} alt={post.thumbnailAlt} />
      </div>
      <div className="card-content">
        <h2>{post.title}</h2>
        <p>{getPublishDateDisplay(post.publishDate)}</p>
        <p>{post.summary}</p>
      </div>
    </div>
  );
}
