import React from "react";
import Emoji from "../../components/Emoji";
import ExternalLink from "../../components/ExternalLink";
import Layout from "../../components/Layout";

export default function Dcldb(): JSX.Element {
  return (
    <Layout>
      <h1>Dragon Cave Lineage Database</h1>
      <div className="columns is-reversed">
        <div className="column">
          <p className="is-size-5-tablet">
            The Dragon Cave Lineage Database (DCLDB) is an online database of
            lineages (and breedings coming soon!) of the digital dragons from
            the creature collection game,{" "}
            <ExternalLink href="https://dragcave.net/">
              Dragon Cave
            </ExternalLink>
            .
          </p>

          <h2>Background</h2>
          <p>
            I have been playing Dragon Cave since 2008 and when the lineage page
            was introduced, I became quite interested in creating my own
            combination of dragon species, variations, and naming schemes.
            Previously I had all of my lineages in a giant Google Sheet. As it
            grew, the load times became longer and eventually grew to a point
            where searching became nearly impossible. It was hard to get
            organized for the big annual breeding events and there have been
            times when I missed a pairing that can only produce the special
            species once a year, so I would have to wait an entire year for
            another chance. <Emoji name="eye_roll" />
          </p>

          <p>
            So, I decided to put my coding skills to use and create something
            that I would find useful in organizing and searching for lineages. I
            also added the ability for others to join and add their own lineages
            because if I found it helpful, someone else might as well.
          </p>
          <h2>Take a Look</h2>
          <p>
            Whether you&apos;re a lineage enthusiast or a curious developer,
            feel free to use the search on DCLDB and look at the current
            project&apos;s progress on Github. I&apos;m currently in the middle
            of finishing the minimal viable product (MVP) of the search and user
            profiles.
          </p>

          <div className="buttons">
            <ExternalLink
              href="https://dc-lineage-db.vercel.app/"
              className="button is-primary"
            >
              Visit DCLDB
            </ExternalLink>
            <ExternalLink
              href="https://github.com/brittaniSavery/dc-lineage-db"
              className="button is-primary is-light"
            >
              View Code
            </ExternalLink>
          </div>
        </div>
        <div className="column is-narrow">
          <img
            src="https://via.placeholder.com/350x445.jpg?text=DCLDB"
            alt=""
          />
        </div>
      </div>
    </Layout>
  );
}
