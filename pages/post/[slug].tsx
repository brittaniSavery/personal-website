import React from "react";
import dynamic from "next/dynamic";
import Layout from "../../components/Layout";

type Props = {
  attributes: {title:string,slug:string,publishDate: tags: Array<string> };
  Content: JSX.Element;
};

export default function Post({ attributes, Content }: Props): JSX.Element {
  return (
    <Layout>
      <Content />
    </Layout>
  );
}
