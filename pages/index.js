import React from "react";
import Layout from "../components/Layout";
import fm from "../content/home.md";

export default function Home() {
  console.log(fm);
  return (
    <Layout>
      <fm.react />
    </Layout>
  );
}
