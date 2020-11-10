import React from "react";
import ExternalLink from "./ExternalLink";
import BlackMeredithPress from "../public/images/black-meredith-press-no-name.svg";

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bsa-margin footer bsa-footer">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-4">
            <p className="is-size-4 has-text-light has-text-centered">
              Also Find Me On
            </p>
            <ExternalLink
              href="https://blackmeredithpress.com"
              className="button is-fullwidth is-medium"
            >
              <span className="icon">
                <BlackMeredithPress />
              </span>
              <span>Black Meredith Press</span>
            </ExternalLink>
            <div className="columns">
              <div className="column">
                <img src="images/social/amazon-sig.png" />
              </div>
              <div className="column">
                <img src="images/social/facebook-sig.png" />
              </div>
              <div className="column">
                <img src="images/social/github-sig.png" />
              </div>
              <div className="column">
                <img src="images/social/goodreads-sig.png" />
              </div>
              <div className="column">
                <img src="images/social/instagram-sig.png" />
              </div>
              <div className="column">
                <img src="images/social/linkedin-sig.png" />
              </div>
              <div className="column">
                <img src="images/social/twitter-sig.png" />
              </div>
            </div>
          </div>
        </div>
        <p className="has-text-centered">
          Copyright &copy; {currentYear} Brittani S Avery
        </p>
      </div>
    </footer>
  );
}
