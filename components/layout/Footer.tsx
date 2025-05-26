import {
  faBluesky,
  faFacebookF,
  faGithub,
  faGoodreadsG,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import copyright from "../../lib/copyright";
import BSAFullLogo from "../../public/images/logo-initials.svg";
import ExternalLink from "../ExternalLink";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Footer(): JSX.Element {
  return (
    <footer className="bsa-margin footer bsa-footer">
      <div className="container is-max-desktop">
        <div className="columns is-centered has-text-centered">
          <div className="column is-narrow">
            <p className="is-size-3-tablet is-size-2">
              <BSAFullLogo className="bsa-full-logo" />
              Brittani S Avery
            </p>
          </div>
          <div className="column is-narrow">
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
                <span className="fa-layers fa-fw fa-2xl">
                  <FontAwesomeIcon icon={faSquare} />
                  <FontAwesomeIcon
                    icon={faFacebookF}
                    transform={"shrink-2"}
                    color="white"
                  />
                </span>
                <span className="is-sr-only" role="presentation">
                  Facebook
                </span>
              </ExternalLink>
              <ExternalLink href="https://www.instagram.com/brittanisavery">
                <span className="fa-layers fa-fw fa-2xl">
                  <FontAwesomeIcon icon={faSquare} />
                  <FontAwesomeIcon
                    icon={faInstagram}
                    transform={"shrink-4"}
                    color="white"
                  />
                </span>
                <span className="is-sr-only" role="presentation">
                  Instagram
                </span>
              </ExternalLink>
              <ExternalLink href="https://bsky.app/profile/brittanisavery.bsky.social">
                <span className="fa-layers fa-fw fa-2xl">
                  <FontAwesomeIcon icon={faSquare} />
                  <FontAwesomeIcon
                    icon={faBluesky}
                    transform={"shrink-4"}
                    color="white"
                  />
                </span>
                <span className="is-sr-only" role="presentation">
                  Bluesky
                </span>
              </ExternalLink>
              <ExternalLink href="https://www.linkedin.com/in/brittanisavery">
                <span className="fa-layers fa-fw fa-2xl">
                  <FontAwesomeIcon icon={faSquare} />
                  <FontAwesomeIcon
                    icon={faLinkedinIn}
                    transform={"shrink-3"}
                    color="white"
                  />
                </span>
                <span className="is-sr-only" role="presentation">
                  LinkedIn
                </span>
              </ExternalLink>
              <ExternalLink href="https://github.com/brittaniSavery">
                <span className="fa-layers fa-fw fa-2xl">
                  <FontAwesomeIcon icon={faSquare} />
                  <FontAwesomeIcon
                    icon={faGithub}
                    transform={"shrink-3"}
                    color="white"
                  />
                </span>
                <span className="is-sr-only" role="presentation">
                  Github
                </span>
              </ExternalLink>
              <ExternalLink href="https://www.goodreads.com/author/show/17074316.Brittani_S_Avery">
                <span className="fa-layers fa-fw fa-2xl">
                  <FontAwesomeIcon icon={faSquare} />
                  <FontAwesomeIcon
                    icon={faGoodreadsG}
                    transform={"shrink-3"}
                    color="white"
                  />
                </span>
                <span className="is-sr-only" role="presentation">
                  Goodreads
                </span>
              </ExternalLink>
            </p>
            <p className="bsa-social">
              <ExternalLink href="https://ko-fi.com/brittanisavery">
                <Image
                  src="/images/social/support_me_on_kofi_dark.png"
                  alt="Support me on Ko-fi"
                  width={200}
                  height={40}
                />
              </ExternalLink>
            </p>
            <p className="pt-3 is-size-7">
              Copyright &copy; {copyright} Brittani S Avery
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
