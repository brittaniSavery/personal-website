import React from "react";
import Layout from "../components/Layout";
import MarkdownParser from "../components/MarkdownParser";
import { html as home } from "../content/home.md";

export default function Home(): JSX.Element {
  return (
    <Layout>
      <MarkdownParser content={home} />
    </Layout>
  );
}
