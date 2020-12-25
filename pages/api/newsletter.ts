import type { NextApiRequest, NextApiResponse } from "next";

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

    console.log(req.body.email);

    const interests: Record<string, boolean> = {};
    if (req.body.writing) interests[req.body.writing] = true;
    if (req.body.coding) interests[req.body.coding] = true;
    if (req.body.lifestyle) interests[req.body.lifestyle] = true;

    try {
      const response = await mailchimp.lists.addListMember(
        process.env.MAILCHIMP_LIST_ID,
        {
          email_address: req.body.email,
          status: "subscribed",
          merge_fields: { FNAME: req.body.fname },
          interests: interests,
        }
      );
      res.status(200).send("Looks good!");
    } catch (e) {
      res.status(e.status).end();
    }
  } else {
    res.status(405).end();
  }
}
