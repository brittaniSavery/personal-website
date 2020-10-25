import Link from "next/link";
import React from "react";

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
        <Link href={`/post/${post.slug}`}>
          <a>
            <h2 className="subtitle">{post.title}</h2>
          </a>
        </Link>
        <p>{post.summary}</p>
      </div>
    </div>
  );
}
