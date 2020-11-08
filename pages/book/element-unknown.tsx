import React from "react";
import Layout from "../../components/Layout";

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
          <p>
            <span className="is-italic">
              &quot;It was the kind of book that grabbed your attention and
              didn’t let go until the last page.&quot;
            </span>
            <br />
            &mdash;Selbi (Amazon)
          </p>
        </div>
        <div className="column is-narrow">
          <img src="/images/element-unknown-mockup.jpg" />
        </div>
      </div>
    </Layout>
  );
}
