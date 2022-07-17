import { useMatomo } from "@datapunt/matomo-tracker-react";
import { titleCase } from "title-case";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import clsx from "clsx";
import { GetStaticProps } from "next";
import { useRef, useState } from "react";
import Emoji from "../components/Emoji";
import TextField from "../components/fields/TextField";
import { isEmpty } from "lodash-es";

type NewsletterProps = {
  meta: GeneralMeta;
  topics: Topic[];
};

export default function Newsletter({ topics }: NewsletterProps): JSX.Element {
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const captchaRef = useRef<HCaptcha>(null);

  const { trackEvent } = useMatomo();

  async function joinSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target;
    const validity = form.checkValidity();

    if (!validity) {
      const fnameElement = document.getElementById("name") as HTMLInputElement;
      const emailElement = document.getElementById("email") as HTMLInputElement;

      setNameError(
        fnameElement.validity.valueMissing ? "A first name is required." : ""
      );

      setEmailError(
        emailElement.validity.valueMissing
          ? "An email address is required."
          : emailElement.validity.typeMismatch
          ? "This email address is not valid."
          : ""
      );
    }

    const formJson: Record<string, unknown> = {};
    const formData = new FormData(form);
    for (const [name, value] of formData) {
      formJson[name] = value.toString();
    }

    if (isEmpty(formJson["h-captcha-response"])) {
      setCaptchaError("The captcha check is required.");
    } else {
      // verify the captcha
      const verified = await fetch("/api/captcha", {
        method: "POST",
        body: new URLSearchParams({ token: captchaToken }),
      });

      if (!verified.ok) {
        setCaptchaError(
          "The captcha check was not successful. Please try again."
        );
      }
    }

    // form has some kind of error, so stop here
    if (nameError || emailError || captchaError) {
      captchaRef.current.resetCaptcha();
      return;
    }

    const newsletterResponse = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formJson),
    });

    if (newsletterResponse.ok) {
      const member = await newsletterResponse.json();

      setNameError("");
      setEmailError("");
      setSuccessMessage(
        `Thanks ${member.name}! ${
          member.isNew
            ? "Be on the lookout for your welcome email."
            : "Your information has been updated."
        }`
      );
      trackEvent({ category: "interaction", action: "newsletter-signup" });
      form.reset();
    } else {
      setEmailError(await newsletterResponse.text());
      document.getElementById("email").focus();
    }

    captchaRef.current.resetCaptcha();
  }

  return (
    <>
      <h1>Join the Newsletter</h1>
      <p>
        By joining the monthly(-ish) newsletter, you will be one of the first to
        receive updates on all of my on-going projects, from code to novels to
        poetry. There will also be sneak peaks on upcoming releases as well as
        an exclusive backstage pass to my creative process. Sign up and get in
        on the fun! <Emoji name="smile" />
      </p>

      <div
        className={clsx("message is-success", { "is-hidden": !successMessage })}
      >
        <div className="message-body" aria-live="polite">
          {successMessage}
        </div>
      </div>

      <form noValidate onSubmit={joinSubmit}>
        <TextField
          id="name"
          label="First Name"
          type="text"
          error={nameError}
          required
          autoFocus
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          error={emailError}
          required
        />

        <div className="field">
          <span className="label has-text-primary">Topics Selection</span>
          {topics.map((topic) => (
            <div key={topic.name} className="control">
              <label htmlFor={topic.name} className="checkbox">
                <input
                  name={topic.name.toLowerCase()}
                  id={topic.name.toLowerCase()}
                  type="checkbox"
                  value={topic.id}
                  defaultChecked
                />
                &nbsp; {topic.name} - {topic.description}
              </label>
            </div>
          ))}
        </div>

        <div className="field">
          <span className="label has-text-primary">Proof of Humanity</span>
          <HCaptcha
            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
            onVerify={(token) => {
              setCaptchaToken(token);
            }}
            ref={captchaRef}
          />
          <p className={clsx("help is-danger")} aria-live="polite">
            {captchaError}
          </p>
        </div>

        <div className="field">
          <div className="control">
            <button type="submit" className="button is-primary">
              Join
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

function getTopicDescription(topic: string) {
  switch (topic) {
    case "writing":
      return "Receive novel updates and backstage passes into my creative writing processes";
    case "coding":
      return "Learn about my hobby projects and libraries/frameworks I've found";
    case "lifestyle":
      return "See big life events from my point of view or just some ramblings from me";
    default:
      return null;
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const meta: GeneralMeta = {
    url: process.env.WEBSITE + "/newsletter",
    type: "website",
    title: "Join the Newsletter",
    fullTitle: "Brittani S Avery's Newsletter",
    description:
      "Join the newsletter to have backstage access to her writing process, coding projects, sneak peaks, and much more!",
    thumbnail: `${process.env.WEBSITE}/images/meta/newsletter.png`,
  };

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mailchimp = require("@mailchimp/mailchimp_marketing");
  const [apiKey, serverPrefix] = process.env.MAILCHIMP_API_KEY.split("-");
  mailchimp.setConfig({
    apiKey: apiKey,
    server: serverPrefix,
  });

  const interestsResponse = await mailchimp.lists.listInterestCategoryInterests(
    process.env.MAILCHIMP_LIST_ID,
    process.env.MAILCHIMP_INTERESTS_ID
  );

  const topics: Topic[] = interestsResponse.interests.map((interest) => ({
    id: interest.id,
    name: interest.name === "Lifestyle" ? "Personal" : interest.name,
    description: getTopicDescription(interest.name.toLowerCase()),
  }));

  return {
    props: { meta: meta, topics: topics },
  };
};
