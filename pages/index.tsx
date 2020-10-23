import React from "react";
import Layout from "../components/Layout";
import { react as HomeContent } from "../content/home.md";

export default function Home(): JSX.Element {
  return (
    <Layout>
      <HomeContent />
    </Layout>
  );
}
