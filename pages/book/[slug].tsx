import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import ExternalLink from "../../components/ExternalLink";
import Layout from "../../components/Layout";
import ReviewQuote from "../../components/ReviewQuote";
import books from "../../content/projects/books.json";

type BookProps = {
  meta: BookMeta;
  title: string;
  blurb: string[];
  reviews: {
    location: string;
    name: string;
    text: string;
  }[];
  image: string;
  alt?: string;
  amazonLink: string;
};

export default function Book({
  meta,
  title,
  blurb,
  reviews,
  image,
  alt,
  amazonLink,
}: BookProps): JSX.Element {
  return (
    <Layout meta={meta}>
      <h1>{title}</h1>
      <div className="bsa-project-img">
        <img src={`/images/${image}`} alt={alt} />
      </div>
      {blurb.map((paragraph, index) => (
        <p key={`${title}-${index}`} className="is-size-5-tablet">
          {paragraph}
        </p>
      ))}

      <h2>Quotes from Readers</h2>
      {reviews.map((review) => (
        <ReviewQuote
          key={review.name}
          name={review.name}
          location={review.location}
        >
          {review.text}
        </ReviewQuote>
      ))}

      <h2>Grab Your Copy</h2>
      <p>
        <span className="is-italic">{title}</span> is available as a paperback
        and an e-book. I have autographed copies for sell if you&apos;re looking
        for a physical option. If digital is more your style, you can find the
        e-books on <ExternalLink href={amazonLink}>Amazon</ExternalLink>.
      </p>
      <button className="button is-primary has-text-centered">
        Order Autographed Copies
      </button>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = books.map((book) => ({
    params: {
      slug: book.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const book = books.find((b) => b.slug === slug);

  const meta: BookMeta = {
    description: book.meta.description,
    isbn: book.isbn,
    thumbnail: `${process.env.WEBSITE}/images/${book.meta.image}`,
    title: book.title,
    type: "books.book",
    url: `${process.env.WEBSITE}/book/${book.slug}`,
  };

  return {
    props: {
      meta: meta,
      title: book.title,
      blurb: book.blurb,
      reviews: book.reviews,
      image: book.image,
      alt: book.alt,
      amazonLink: book.amazonLink,
    },
  };
};
