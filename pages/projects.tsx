import React from "react";
import {
  BSACard,
  BSACardContent,
  BSACardFooter,
  BSACardImage,
  CardFooterItem,
} from "../components/BSACard";
import Layout from "../components/Layout";

type ProjectProps = {
  title: string;
  image: string;
  type: string;
  details: string;
  footerItems: CardFooterItem[];
};

function Project({
  title,
  image,
  type,
  details,
  footerItems,
}: ProjectProps): JSX.Element {
  return (
    <div className="column is-one-third-desktop is-half-tablet">
      <BSACard className="project-card">
        <BSACardImage src={`/images/projects/${image}`} />
        <BSACardContent>
          <p className="is-size-4 mb-0">{title}</p>
          <p>
            {type}
            <br />
            {details}
          </p>
        </BSACardContent>
        <BSACardFooter items={footerItems} />
      </BSACard>
    </div>
  );
}

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
    bsa: [{ label: "Learn More", link: "/code/bsa-site" }],
    //writing
    elementUnknown: [{ label: "Learn More", link: "/book/element-unknown" }],
    euSequel: [{ label: "Coming Soon!" }],
  };

  return (
    <Layout>
      <h1>Projects</h1>
      <h2>Coding</h2>
      <div className="columns is-multiline">
        <Project
          title="Simulation International Basketball Association"
          image="siba-card.png"
          type="Website"
          details="React, Bootstrap, AWS Lamda, PHP, MySQL"
          footerItems={footerLinks.siba}
        />
        <Project
          title="Dragon Cave Lineage Database"
          image="dcldb-card.png"
          type="Database"
          details="Next.js, Bulma CSS Framework, MongoDB"
          footerItems={footerLinks.dcldb}
        />
        <Project
          title="Official Site for Brittani S Avery"
          image="website-card.png"
          type="Website"
          details="Next.js, Typescript, Bulma CSS Framework, Markdown-It"
          footerItems={footerLinks.bsa}
        />
      </div>
      <h2>Writing</h2>
      <div className="columns">
        <Project
          title="Element Unknown"
          image="element-unknown-card.jpg"
          type="Novel"
          details="Young Adult, Fantasy, Science-Fiction"
          footerItems={footerLinks.elementUnknown}
        />
        <Project
          title="Element Unknown Sequel"
          image="coming-soon-card.png"
          type="Novel"
          details="Young Adult, Fantasy, Science-Fiction"
          footerItems={footerLinks.euSequel}
        />
      </div>
    </Layout>
  );
}
