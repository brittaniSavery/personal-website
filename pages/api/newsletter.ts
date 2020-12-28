import type { NextApiRequest, NextApiResponse } from "next";
import md5 from "md5";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mailchimp = require("@mailchimp/mailchimp_marketing");
    const [apiKey, serverPrefix] = process.env.MAILCHIMP_API_KEY.split("-");
    mailchimp.setConfig({
      apiKey: apiKey,
      server: serverPrefix,
    });

    const interests: Record<string, boolean> = {};
    if (req.body.writing) interests[req.body.writing] = true;
    if (req.body.coding) interests[req.body.coding] = true;
    if (req.body.lifestyle) interests[req.body.lifestyle] = true;

    try {
      const email = req.body.email.toLowerCase();
      const firstName = req.body.fname;
      const emailHash = md5(email);

      const response = await mailchimp.lists.setListMember(
        process.env.MAILCHIMP_LIST_ID,
        emailHash,
        {
          email_address: email,
          merge_fields: { FNAME: firstName },
          interests: interests,
          status_if_new: "subscribed",
        }
      );

      const now = new Date();
      const signup = new Date(response.timestamp_signup);
      const diff = now.getTime() - signup.getTime();

      const member = {
        name: response.merge_fields.FNAME,
        isNew: diff < 60000, //sign up time is less than a minute, meaning the person is a new member
      };

      res.status(200).json(member);
    } catch (e) {
      const status = e.status;
      const mailchimpError = JSON.parse(e.response.text);
      res.status(status).send(mailchimpError.detail);
    }
  } else {
    res.status(405).end();
  }
}
