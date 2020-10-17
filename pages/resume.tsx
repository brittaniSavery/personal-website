import React from "react";
import Layout from "../components/Layout";
import { react as ResumeContent } from "../content/resume.md";

export default function Resume(): JSX.Element {
  return (
    <Layout>
      <ResumeContent />
    </Layout>
  );
}
