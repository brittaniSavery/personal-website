import React from "react";
import ExternalLink from "./ExternalLink";
import BSAFullLogo from "../public/images/logo-initials.svg";
import FacebookLogo from "../public/images/social/facebook-grey.svg";
import TwitterLogo from "../public/images/social/twitter-grey.svg";
import GithubLogo from "../public/images/social/github-grey.svg";
import GoodreadsLogo from "../public/images/social/goodreads-grey.svg";
import InstagramLogo from "../public/images/social/instagram-grey.svg";
import LinkedInLogo from "../public/images/social/linkedin-grey.svg";

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bsa-margin footer bsa-footer">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-7-widescreen is-9-desktop is-11-tablet">
            <div className="columns has-text-centered">
              <div className="column is-narrow">
                <p className="is-size-3-tablet is-size-2">
                  <BSAFullLogo className="bsa-full-logo" />
                  Brittani S Avery
                </p>
              </div>
              <div className="column">
                <p className="is-size-4">Coder. Writer. Gamer. Nerd.</p>
                <p>Find Me on the Internet:</p>
                <p>
                  <ExternalLink href="https://blackmeredithpress.com/">
                    Black Meredith Press
                  </ExternalLink>
                  &mdash;A Publishing Company
                </p>
                <p className="bsa-social">
                  <ExternalLink href="https://facebook.com/brittanisavery">
                    <FacebookLogo />
                    <span className="is-sr-only" role="presentation">
                      Facebook Page
                    </span>
                  </ExternalLink>
                  <ExternalLink href="https://www.instagram.com/brittanisavery">
                    <InstagramLogo />
                    <span className="is-sr-only" role="presentation">
                      Instagram Profile
                    </span>
                  </ExternalLink>
                  <ExternalLink href="https://twitter.com/brittanisavery">
                    <TwitterLogo />
                    <span className="is-sr-only" role="presentation">
                      Twitter Profile
                    </span>
                  </ExternalLink>
                  <ExternalLink href="https://www.linkedin.com/in/brittanisavery">
                    <LinkedInLogo />
                    <span className="is-sr-only" role="presentation">
                      LinkedIn Profile
                    </span>
                  </ExternalLink>
                  <ExternalLink href="https://github.com/brittaniSavery">
                    <GithubLogo />
                    <span className="is-sr-only" role="presentation">
                      Github Profile
                    </span>
                  </ExternalLink>
                  <ExternalLink href="https://www.goodreads.com/author/show/17074316.Brittani_S_Avery">
                    <GoodreadsLogo />
                    <span className="is-sr-only" role="presentation">
                      Goodreads Profile
                    </span>
                  </ExternalLink>
                </p>
                <p className="pt-3 is-size-7">
                  Copyright &copy; {currentYear} Brittani S Avery
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
