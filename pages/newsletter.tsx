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

function joinSubmit(event: React.ChangeEvent<HTMLFormElement>) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  console.log(...formData);
}

export default function Newsletter({
  meta,
  topics,
}: NewsletterProps): JSX.Element {
  const [fnameError, setFnameError] = React.useState(null);
  const [emailError, setEmailError] = React.useState(null);
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
              className="input"
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
              className="input"
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
