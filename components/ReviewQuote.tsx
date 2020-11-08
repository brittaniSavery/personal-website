import React from "react";

type Props = {
  children: string;
  author: string;
  location?: string;
};

export default function ReviewQuote({
  children,
  author,
  location,
}: Props): JSX.Element {
  return (
    <p>
      <span className="is-italic">&quot;{children}&quot;</span>
      <br />
      &mdash;{author} {location ? `(${location})` : ""}
    </p>
  );
}
