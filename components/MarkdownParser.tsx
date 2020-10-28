import React from "react";

type Props = { content: string };

export default function MarkdownParser({ content }: Props): JSX.Element {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
