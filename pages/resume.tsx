import { GetStaticProps } from "next";
import MarkdownParser from "../components/MarkdownParser";
import { attributes, html as resume } from "../content/resume.md";

export default function Resume(): JSX.Element {
  return (
    <>
      <MarkdownParser content={resume} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const url = process.env.WEBSITE;

  const meta: GeneralMeta = {
    url: url + "/resume",
    type: "website",
    title: attributes.title,
    description: attributes.description,
    thumbnail: `${url}/images/${attributes.thumbnail}`,
    thumbnailAlt: attributes.thumbnailAlt,
  };

  return {
    props: { meta: meta },
  };
};
