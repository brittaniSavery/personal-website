import Head from "next/head";
import React from "react";

export default function MetaTags({
  title,
  description,
  type,
  thumbnail,
  url,
  fullTitle,
  ...rest
}: AllMeta): JSX.Element {
  const ArticleMetaTags = () => {
    if (type !== "article") return null;

    const authorTags = rest as { publishDate: string };
    return (
      <>
        <meta
          property="article:author"
          content="https://www.facebook.com/brittanisavery"
        />
        <meta
          property="article:published_time"
          content={authorTags.publishDate}
        />
      </>
    );
  };

  const BookMetaTags = () => {
    if (type !== "books.book") return null;

    const bookTags = rest as { isbn: string };
    return (
      <>
        <meta property="books:isbn" content={bookTags.isbn} />
        <meta
          property="books:author"
          content="https://www.goodreads.com/author/show/17074316.Brittani_S_Avery"
        />
      </>
    );
  };

  return (
    <Head>
      <title>{title} | Brittani S Avery</title>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#fff" />

      <meta property="og:title" content={title} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={thumbnail} />
      <meta property="og:site_name" content="Brittani S Avery" />

      {ArticleMetaTags()}
      {BookMetaTags()}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@brittanisavery" />
      <meta name="twitter:title" content={fullTitle || title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={thumbnail} />
    </Head>
  );
}
