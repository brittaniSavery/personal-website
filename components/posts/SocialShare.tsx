import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import LinkedInLogo from "../../public/images/social/linkedin-grey.svg";
import FacebookLogo from "../../public/images/social/facebook-grey.svg";
import TwitterLogo from "../../public/images/social/twitter-grey.svg";

type SocialShareProps = {
  url: string;
  title: string;
};

export default function SocialShare({
  url,
  title,
}: SocialShareProps): JSX.Element {
  return (
    <div className="bsa-social">
      Share:
      <FacebookShareButton
        url={url}
        title={title}
        style={{ verticalAlign: "text-top" }}
      >
        <FacebookLogo />
        <span className="is-sr-only" role="presentation">
          Facebook Page
        </span>
      </FacebookShareButton>
      <TwitterShareButton
        url={url}
        title={title}
        style={{ verticalAlign: "text-top" }}
      >
        <TwitterLogo />
        <span className="is-sr-only" role="presentation">
          Tweet this!
        </span>
      </TwitterShareButton>
      <LinkedinShareButton
        url={url}
        title={title}
        style={{ verticalAlign: "text-top" }}
      >
        <LinkedInLogo />
        <span className="is-sr-only" role="presentation">
          LinkedIn Profile
        </span>
      </LinkedinShareButton>
    </div>
  );
}
