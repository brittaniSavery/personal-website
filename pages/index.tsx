import { GetStaticProps } from "next";
import MarkdownParser from "../components/MarkdownParser";
import PostCard from "../components/posts/PostCard";
import { attributes, html as home } from "../content/home.md";
import { getPostsByDate } from "../lib/postsHelper";

type HomeProps = {
  meta: GeneralMeta;
  recentPosts: Post[];
};

export default function Home({ recentPosts }: HomeProps): JSX.Element {
  return (
    <>
      <MarkdownParser content={home} />
      <div className="columns">
        {recentPosts.map((post) => (
          <div key={post.slug} className="column is-half">
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const url = process.env.WEBSITE;

  const meta: GeneralMeta = {
    url: url,
    type: "website",
    fullTitle: `Brittani S Avery. ${attributes.title}`,
    title: attributes.title,
    description: attributes.description,
    thumbnail: `${url}/images/${attributes.thumbnail}`,
  };

  const posts = await getPostsByDate();

  return {
    props: { meta: meta, recentPosts: posts.slice(0, 2) },
  };
};
