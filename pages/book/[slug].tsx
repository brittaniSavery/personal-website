import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import ExternalLink from "../../components/ExternalLink";
import OrderBooks from "../../components/projects/OrderBooks";
import ReviewQuote from "../../components/projects/ReviewQuote";
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
  newsletterTopics: Topic[];
};

export default function Book({
  title,
  blurb,
  reviews,
  image,
  alt,
  amazonLink,
  newsletterTopics,
}: BookProps): JSX.Element {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <h1>{title}</h1>
      <div className="bsa-project-img">
        {/* eslint-disable-next-line @next/next/no-img-element*/}
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
      <button
        className="button is-primary has-text-centered"
        onClick={() => setOpen(true)}
      >
        Order Autographed Copies
      </button>
      <OrderBooks
        open={isOpen}
        onClose={() => setOpen(false)}
        topics={newsletterTopics}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = books
    .filter((book) => book.slug !== "")
    .map((book) => ({
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
    thumbnailAlt: book.meta.alt,
    title: book.title,
    type: "books.book",
    url: `${process.env.WEBSITE}/book/${book.slug}`,
  };

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mailchimp = require("@mailchimp/mailchimp_marketing");
  const [apiKey, serverPrefix] = process.env.MAILCHIMP_API_KEY.split("-");
  mailchimp.setConfig({
    apiKey: apiKey,
    server: serverPrefix,
  });

  const interestsResponse = await mailchimp.lists.listInterestCategoryInterests(
    process.env.MAILCHIMP_LIST_ID,
    process.env.MAILCHIMP_INTERESTS_ID
  );

  const topics: Topic[] = interestsResponse.interests.map((interest) => ({
    id: interest.id,
    name: interest.name,
  }));

  return {
    props: {
      meta: meta,
      title: book.title,
      blurb: book.blurb,
      reviews: book.reviews,
      image: book.image,
      alt: book.alt,
      amazonLink: book.amazonLink,
      newsletterTopics: topics,
    },
  };
};
