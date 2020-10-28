import React from "react";

type TagGroupProps = {
  tags: string[];
};

export default function TagGroup({ tags }: TagGroupProps): JSX.Element {
  return (
    <div className="bulma-tags">
      {tags.map((tag) => (
        <span key={tag} className="bulma-tag">
          {tag}
        </span>
      ))}
    </div>
  );
}
