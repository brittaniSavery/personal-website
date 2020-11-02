import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";

export default function Projects(): JSX.Element {
  return (
    <Layout>
      <h1>Projects</h1>
      <h2>Coding</h2>
      <h2>Writing</h2>
      <div className="columns is-multiline">
        <div className="column is-one-quarter">
          <div className="card bsa-card">
            <div className="card-content">
              <img src="/images/element-unknown-mockup.jpg" />
              <p className="is-size-4 is-italic mb-0">Element Unknown</p>
              <p>
                Novel
                <br />
                Young Adult, Fantasy, Science-Fiction
              </p>
            </div>
            <div className="card-footer">
              <Link href="/book/element-unknown">
                <a className="card-footer-item">Learn More</a>
              </Link>
            </div>
          </div>
        </div>
        <div className="column is-one-quarter">
          <div className="card bsa-card">
            <div className="card-content">
              <img src="/images/coming-soon-mockup.jpg" />
              <p className="is-size-4 mb-0">
                <span className="is-italic">Element Unknown</span> Sequel
              </p>
              <p>
                Novel
                <br />
                Young Adult, Fantasy, Science-Fiction
              </p>
            </div>
            <div className="card-footer">
              <p className="card-footer-item">Coming Soon!</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
