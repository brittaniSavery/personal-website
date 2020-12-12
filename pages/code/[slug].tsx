import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import ExternalLink from "../../components/ExternalLink";
import fs from "fs";
import Layout from "../../components/Layout";
import MarkdownParser from "../../components/MarkdownParser";
import clsx from "clsx";

type CodeProps = {
  meta: GeneralMeta;
  title: string;
  image: string;
  alt?: string;
  content: string;
  links: { text: string; url: string }[];
};

export default function Code({
  meta,
  title,
  image,
  alt,
  content,
  links,
}: CodeProps): JSX.Element {
  return (
    <Layout meta={meta}>
      <h1>{title}</h1>
      <div className="bsa-project-img">
        <img src={`/images/${image}`} alt={alt} />
      </div>
      <MarkdownParser className="bsa-project" content={content} />
      <div className="buttons mt-4">
        {links.map((link, index) => (
          <ExternalLink
            key={link.text}
            href={link.url}
            className={clsx("button is-primary", { "is-light": index > 0 })}
          >
            {link.text}
          </ExternalLink>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(process.cwd() + "/content/projects/code");

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const { attributes, html } = await import(
    "../../content/projects/code/" + slug + ".md"
  );

  const meta: GeneralMeta = {
    description: attributes.meta.description,
    thumbnail: `${process.env.WEBSITE}/images/${attributes.meta.image}`,
    title: attributes.title,
    fullTitle: attributes.fullTitle || null,
    type: "website",
    url: `${process.env.WEBSITE}/code/${slug}`,
  };

  return {
    props: {
      meta: meta,
      title: attributes.title,
      image: attributes.image,
      alt: attributes.alt || null,
      links: attributes.links,
      content: html,
    },
  };
};
