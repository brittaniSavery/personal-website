import clsx from "clsx";
import { GetStaticProps } from "next";
import React from "react";
import Emoji from "../components/Emoji";
import Layout from "../components/Layout";

type NewsletterProps = {
  meta: GeneralMeta;
  topics: Topic[];
};

type Topic = {
  id: string;
  name: string;
};

export default function Newsletter({
  meta,
  topics,
}: NewsletterProps): JSX.Element {
  const [fnameError, setFnameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  async function joinSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target;
    const validity = form.checkValidity();

    if (!validity) {
      const fnameElement = document.getElementById("fname") as HTMLInputElement;
      const emailElement = document.getElementById("email") as HTMLInputElement;

      setFnameError(
        fnameElement.validity.valueMissing ? "Please enter your first name" : ""
      );

      setEmailError(
        emailElement.validity.valueMissing
          ? "Please enter your email address"
          : emailElement.validity.typeMismatch
          ? "This email address is not valid. Please enter a valid email address."
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
      setFnameError("");
      setEmailError("");
      form.reset();
    } else {
      setEmailError(await newsletterResponse.text());
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

      <form noValidate onSubmit={joinSubmit}>
        <div className="field">
          <label htmlFor="fname" className="label has-text-primary">
            First Name *
          </label>
          <div className="control">
            <input
              id="fname"
              name="fname"
              className={clsx("input", { "is-danger": emailError })}
              type="text"
              required
              autoFocus
            />
          </div>
          <p className={clsx("help is-danger")} aria-live="polite">
            {fnameError}
          </p>
        </div>

        <div className="field">
          <label htmlFor="email" className="label has-text-primary">
            Email *
          </label>
          <div className="control">
            <input
              id="email"
              name="email"
              className={clsx("input", { "is-danger": emailError })}
              type="email"
              required
            />
          </div>
          <p className={clsx("help is-danger")} aria-live="polite">
            {emailError}
          </p>
        </div>

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
