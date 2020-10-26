import React from "react";
import ReactHtmlParser from "react-html-parser";

type Props = { content: string };

export default function MarkdownParser({ content }: Props): JSX.Element {
  return <div className="content bsa-margin">{ReactHtmlParser(content)}</div>;
}
