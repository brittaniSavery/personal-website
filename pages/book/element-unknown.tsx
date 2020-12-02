import React from "react";
import ExternalLink from "../../components/ExternalLink";
import Layout from "../../components/Layout";
import ReviewQuote from "../../components/ReviewQuote";

export default function ElementUnknown(): JSX.Element {
  return (
    <Layout>
      <h1>Element Unknown</h1>
      <div className="columns is-reversed">
        <div className="column">
          <p className="is-size-5-tablet">
            Fifteen-year-old Rex Marshall, son of a high government official,
            doesn&apos;t seem to belong to the upper class society of the
            affluent country, Maventa. While trying to prove his maturity to
            take over the family inheritance, life takes an unexpected turn as
            he frees a strange looking slave with a unique connection to him and
            begins to develop new elemental powers.
          </p>

          <h2>Quotes from Readers</h2>
          <ReviewQuote author="Selbi" location="Amazon">
            It was the kind of book that grabbed your attention and didn’t let
            go until the last page.
          </ReviewQuote>
          <ReviewQuote author="Lisa Buford" location="Amazon">
            I was drawn into the world by the end of the first chapter. It was
            hard to put the book down!
          </ReviewQuote>
          <ReviewQuote author="Kate Fox" location="Amazon">
            Engaging plot and irresistible characters.
          </ReviewQuote>
          <ReviewQuote author="Shannon Rohrer" location="Goodreads">
            Environmental details were well-written, the sub-plots involving
            Meenal and Rex trying to learn about their backgrounds was
            intriguing.
          </ReviewQuote>

          <h2>Grab Your Copy</h2>
          <p>
            <span className="is-italic">Element Unknown</span> is available as a
            paperback and an e-book. I have autographed copies for sell if
            you&apos;re looking for a physical option. If digital is more your
            style, you can find the e-books on{" "}
            <ExternalLink href="http://amzn.to/2vSpcxR">Amazon</ExternalLink>.
          </p>
          <button className="button is-primary has-text-centered">
            Order Autographed Copies
          </button>
        </div>
        <div className="column is-narrow">
          <img
            src="/images/element-unknown-mockup.jpg"
            alt="The novel, Element Unknown, in its paperback form"
          />
        </div>
      </div>
    </Layout>
  );
}
