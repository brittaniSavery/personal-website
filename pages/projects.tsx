import React from "react";
import { GetStaticProps } from "next";
import { BSACard, BSACardContent, BSACardImage } from "../components/BSACard";
import Layout from "../components/Layout";
import Link from "next/link";
import TagGroup from "../components/TagGroup";
import fs from "fs";
import books from "../content/projects/books.json";

type Project = {
  slug?: string;
  title: string;
  image: string;
  alt?: string;
  type: string;
  subType: string;
  tags: string[];
};

type ProjectsProps = {
  meta: GeneralMeta;
  coding: Project[];
  writing: Project[];
};

function Project({
  title,
  image,
  slug,
  type,
  subType,
  tags,
  alt,
}: Project): JSX.Element {
  return (
    <div className="column is-one-third-desktop is-half-tablet">
      <BSACard className="project-card">
        <BSACardImage src={`/images/${image}`} alt={alt || ""} />
        <BSACardContent>
          {slug ? (
            <Link href={`/${type}/${slug}`}>
              <a className="is-size-4 mb-0 has-text-weight-semibold has-text-primary">
                {title}
              </a>
            </Link>
          ) : (
            <p className="is-size-4 mb-0 has-text-weight-semibold has-text-primary">
              {title}
            </p>
          )}

          <p className="mb-1">{subType}</p>
          <TagGroup tags={tags} />
        </BSACardContent>
      </BSACard>
    </div>
  );
}

export default function Projects({
  meta,
  coding,
  writing,
}: ProjectsProps): JSX.Element {
  return (
    <Layout meta={meta}>
      <h1>Projects</h1>
      <p>
        Being that I am both a coder and a writer with an imaginative mind that
        just won&apos;t stop, I usually have multiple projects going on at the
        same time in various states of completion.
      </p>
      <h2>Coding</h2>
      <div className="columns is-multiline">
        {coding.map((code) => (
          <Project
            key={code.title}
            slug={code.slug}
            title={code.title}
            alt={code.alt}
            image={code.image}
            type={code.type}
            subType={code.subType}
            tags={code.tags}
          />
        ))}
      </div>
      <h2>Writing</h2>
      <div className="columns">
        {writing.map((write) => (
          <Project
            key={write.title}
            slug={write.slug}
            title={write.title}
            alt={write.alt}
            image={write.image}
            type={write.type}
            subType={write.subType}
            tags={write.tags}
          />
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const meta: GeneralMeta = {
    title: "Projects",
    type: "website",
    url: `${process.env.WEBSITE}/projects`,
    description:
      "A list of projects in various states of completion by Brittani S. Avery, a coder and writer with an imaginative mind that just won't stop.",
    thumbnail: `${process.env.WEBSITE}/images/meta/homepage.jpg`,
  };

  const files = fs.readdirSync(`${process.cwd()}/content/projects/code`);
  const imports = files.map(
    async (file): Promise<Project> => {
      const filename = file.replace(".md", "");
      const { attributes } = await import(
        "../content/projects/code/" + filename + ".md"
      );
      const project: Project = {
        slug: attributes.slug,
        title: attributes.title,
        image: `projects/${attributes.cardImage}`,
        type: "code",
        subType: attributes.type,
        tags: attributes.tech,
      };
      return project;
    }
  );

  const codeProjects: Project[] = await Promise.all(imports);

  const writingProjects: Project[] = books.map((book) => ({
    slug: book.slug,
    title: book.title,
    image: book.card.image,
    type: "book",
    subType: book.card.type,
    tags: book.card.genres,
  }));

  return {
    props: { meta: meta, coding: codeProjects, writing: writingProjects },
  };
};
