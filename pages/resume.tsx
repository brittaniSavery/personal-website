import React from "react";
import Layout from "../components/Layout";
import MarkdownParser from "../components/MarkdownParser";
import { html as resume } from "../content/resume.md";

export default function Resume(): JSX.Element {
  return (
    <Layout>
      <MarkdownParser content={resume} />
    </Layout>
  );
}
