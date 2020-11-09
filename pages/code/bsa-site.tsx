import Link from "next/link";
import React from "react";
import Emoji from "../../components/Emoji";
import ExternalLink from "../../components/ExternalLink";
import Layout from "../../components/Layout";

export default function BsaSite(): JSX.Element {
  return (
    <Layout>
      <h1>Official Site for Brittani S Avery</h1>
      <div className="columns is-reversed">
        <div className="column">
          <p className="is-size-5-tablet">
            This site, brittanisavery.com, is the official website for all
            things me. Books, code projects, blog posts, and other updates will
            be here first and foremost.
          </p>

          <h2>Background</h2>
          <p>
            The first version of my personal website solely focused on my life
            as a published author, highlighting my book. I quickly set up on the
            drag-and-drop website builder{" "}
            <ExternalLink href="https://wix.com">Wix</ExternalLink> just in case
            a non-developer needed to update my website.
          </p>
          <p>
            I introduced version 2 of my website on May 11, 2020 in the first
            post of my new blog,{" "}
            <Link href="/post/new-year-new-look-same-me">
              <a>New Year, New Look, Same Me</a>
            </Link>
            . The shortened version is that I wanted to have my website reflect
            more than just my life as an author. I feel that I accomplished that
            well with version 2.
          </p>

          <p>
            Version 3 is the here and now. I moved away from Wix since it was
            slow and honestly, I knew that I could build something that better
            fit my needs. I used Next.js and Bulma (staples in my personal
            programming) as well as Typescript to try to see what all the buzz
            is about. I can see where it would be useful, but honestly it&apos;s
            just okay. <Emoji name="shrug" />
          </p>

          <h2>Peek Behind the Curtain</h2>
          <p>
            The code for the website is available on Github. I am quite proud of
            how I integrated{" "}
            <ExternalLink href="https://iconify.design/">Iconify</ExternalLink>{" "}
            and{" "}
            <ExternalLink href="https://markdown-it.github.io/">
              Markdown-It
            </ExternalLink>{" "}
            into Next. I enjoy uniformity, so seeing the same style of emojis no
            matter what device one uses makes me happy. <Emoji name="smile" />
          </p>

          <div className="buttons">
            <ExternalLink
              href="https://github.com/brittaniSavery/dc-lineage-db"
              className="button is-primary"
            >
              View Code
            </ExternalLink>
          </div>
        </div>
        <div className="column is-narrow">
          <img
            src="https://via.placeholder.com/350x445.jpg?text=BSA.com"
            alt=""
          />
        </div>
      </div>
    </Layout>
  );
}
