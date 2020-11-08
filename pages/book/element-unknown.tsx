import React from "react";
import Layout from "../../components/Layout";
import ReviewQuote from "../../components/ReviewQuote";

export default function ElementUnknown(): JSX.Element {
  return (
    <Layout>
      <h1>Element Unknown</h1>
      <div className="columns is-reversed">
        <div className="column">
          <p className="is-size-5-tablet">
            A young man tries to find his place in society while learning to
            control new elemental powers after &quot;freeing&quot;—i.e. buying—a
            strange looking slave with a unique connection to him.
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
            intriguing
          </ReviewQuote>

          <h2>Grab Your Copy</h2>
          <p>
            <span className="is-italic">Element Unknown</span> is available as a
            paperback and an e-book. I have autographed copies for sell if
            you&apos;re looking for a physical option. If digital is more your
            style, you can find the e-books on{" "}
            <a href="http://amzn.to/2vSpcxR" rel="noopener noreferrer">
              Amazon
            </a>
            .
          </p>
          <button className="button is-primary is-fullwidth">
            Order Autographed Copies
          </button>
        </div>
        <div className="column is-narrow">
          <img src="/images/element-unknown-mockup.jpg" />
        </div>
      </div>
    </Layout>
  );
}
