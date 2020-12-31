import clsx from "clsx";
import { GetStaticProps } from "next";
import React from "react";
import Emoji from "../components/Emoji";
import TextField from "../components/fields/TextField";
import Layout from "../components/Layout";

type NewsletterProps = {
  meta: GeneralMeta;
  topics: Topic[];
};

export default function Newsletter({
  meta,
  topics,
}: NewsletterProps): JSX.Element {
  const [nameError, setNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  async function joinSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target;
    const validity = form.checkValidity();

    if (!validity) {
      const fnameElement = document.getElementById("name") as HTMLInputElement;
      const emailElement = document.getElementById("email") as HTMLInputElement;

      setNameError(
        fnameElement.validity.valueMissing ? "Please enter your first name" : ""
      );

      setEmailError(
        emailElement.validity.valueMissing
          ? "Your email address is required."
          : emailElement.validity.typeMismatch
          ? "This email address is not valid."
          : ""
      );

      return;
    }

    const formJson: Record<string, unknown> = {};
    const formData = new FormData(form);
    for (const [name, value] of formData) {
      formJson[name] = value.toString();
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
      console.log(member);

      setNameError("");
      setEmailError("");
      setSuccessMessage(
        `Thanks ${member.name}! ${
          member.isNew
            ? "Be on the lookout for your welcome email."
            : "Your information has been updated."
        }`
      );
      form.reset();
    } else {
      setEmailError(await newsletterResponse.text());
      document.getElementById("email").focus();
    }
  }

  return (
    <Layout meta={meta}>
      <h1>Join the Newsletter</h1>
      <p>
        By joining the monthly newsletter, you will be one of the first to
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
          label="First Name *"
          type="text"
          error={nameError}
          required
          autoFocus
        />
        <TextField
          id="email"
          label="Email *"
          type="email"
          error={emailError}
          required
        />

        <div className="field">
          <span className="label has-text-primary">
            What topics do you want to hear from me?
          </span>
          {topics.map((topic) => (
            <div key={topic.name} className="control">
              <label htmlFor="writing" className="checkbox">
                <input
                  name={topic.name}
                  id={topic.name}
                  type="checkbox"
                  value={topic.id}
                  defaultChecked
                />
                &nbsp; {topic.name}
              </label>
            </div>
          ))}
        </div>

        <div className="field">
          <div className="control">
            <button type="submit" className="button is-primary">
              Join
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
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
    name: interest.name,
  }));

  return {
    props: { meta: meta, topics: topics },
  };
};
