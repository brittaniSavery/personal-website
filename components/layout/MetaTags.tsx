import Head from "next/head";

export default function MetaTags({
  title,
  description,
  type,
  thumbnail,
  thumbnailAlt,
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

      <meta name="title" content={fullTitle || title} />
      <meta name="description" content={description} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle || title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {thumbnail && <meta property="og:image" content={thumbnail} />}
      {thumbnailAlt && <meta property="og:image:alt" content={thumbnailAlt} />}
      <meta property="og:site_name" content="Brittani S Avery" />

      {ArticleMetaTags()}
      {BookMetaTags()}

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:creator" content="@brittanisavery" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle || title} />
      <meta property="twitter:description" content={description} />
      {thumbnail && <meta property="twitter:image" content={thumbnail} />}
    </Head>
  );
}
