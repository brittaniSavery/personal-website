import React from "react";
import Layout from "../components/Layout";
import {
  BSACard,
  BSACardContent,
  BSACardFooter,
  BSACardImage,
} from "../components/BSACard";

export default function Projects(): JSX.Element {
  const footerLinks = {
    //coding
    siba: [
      { label: "Learn More", link: "/code/siba" },
      { label: "See it Live!", link: "https://siba.averyincorporated.com/" },
    ],
    dcldb: [
      { label: "Learn More", link: "/code/dcldb" },
      { label: "See it Live!", link: "https://dc-lineage-db.vercel.app/" },
    ],
    bsa: [{ label: "Learn More", link: "/code/personal-site" }],
    //writing
    elementUnknown: [{ label: "Learn More", link: "/book/element-unknown" }],
    euSequel: [{ label: "Coming Soon!" }],
  };

  return (
    <Layout>
      <h1>Projects</h1>
      <h2>Coding</h2>
      <div className="columns is-multiline">
        <div className="column is-one-third-desktop is-half-tablet">
          <BSACard>
            <BSACardImage src="https://via.placeholder.com/940x534.jpg?text=SIBA" />
            <BSACardContent>
              <p className="is-size-4 mb-0">
                Simulation International Basketball Association
              </p>
              <p>
                Website
                <br />
                React, Bootstrap, PHP, mysql
              </p>
            </BSACardContent>
            <BSACardFooter items={footerLinks.siba} />
          </BSACard>
        </div>
        <div className="column is-one-third-desktop is-half-tablet">
          <BSACard>
            <BSACardImage src="https://via.placeholder.com/940x534.jpg?text=DCLDB" />
            <BSACardContent>
              <p className="is-size-4 mb-0">Dragon Cave Lineage Database</p>
              <p>
                Database
                <br />
                Next.js, Bulma, mongoDB
              </p>
            </BSACardContent>
            <BSACardFooter items={footerLinks.dcldb} />
          </BSACard>
        </div>
        <div className="column is-one-third-desktop is-half-tablet">
          <BSACard>
            <BSACardImage src="https://via.placeholder.com/940x534.jpg?text=BSA.com" />
            <BSACardContent>
              <p className="is-size-4 mb-0">
                Official Site for Brittani S Avery
              </p>
              <p>
                Website
                <br />
                Next.js, Bulma, Markdown-It
              </p>
            </BSACardContent>
            <BSACardFooter items={footerLinks.bsa} />
          </BSACard>
        </div>
      </div>
      <h2>Writing</h2>
      <div className="columns">
        <div className="column is-one-third-desktop is-half-tablet">
          <BSACard>
            <BSACardImage src="https://via.placeholder.com/940x534.jpg?text=Element+Unknown" />
            <BSACardContent>
              <p className="is-size-4 is-italic mb-0">Element Unknown</p>
              <p>
                Novel
                <br />
                Young Adult, Fantasy, Science-Fiction
              </p>
            </BSACardContent>
            <BSACardFooter items={footerLinks.elementUnknown} />
          </BSACard>
        </div>
        <div className="column is-one-third-desktop is-half-tablet">
          <BSACard>
            <BSACardImage src="https://via.placeholder.com/940x534.jpg?text=Element+Unknown+Sequel" />
            <BSACardContent>
              <p className="is-size-4 mb-0">
                <span className="is-italic">Element Unknown</span> Sequel
              </p>
              <p>
                Novel
                <br />
                Young Adult, Fantasy, Science-Fiction
              </p>
            </BSACardContent>
            <BSACardFooter items={footerLinks.euSequel} />
          </BSACard>
        </div>
      </div>
    </Layout>
  );
}
