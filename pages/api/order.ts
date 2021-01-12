import type { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";
import md5 from "md5";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    const buyer: Record<string, unknown> = {};
    buyer.name = req.body.firstName;

    //Adding the person to the database (and selected newsletters if applicable)
    const interests: Record<string, boolean> = {};
    if (req.body.writing) interests[req.body.writing] = true;
    if (req.body.coding) interests[req.body.coding] = true;
    if (req.body.lifestyle) interests[req.body.lifestyle] = true;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mailchimp = require("@mailchimp/mailchimp_marketing");
    const [apiKey, serverPrefix] = process.env.MAILCHIMP_API_KEY.split("-");
    mailchimp.setConfig({
      apiKey: apiKey,
      server: serverPrefix,
    });

    try {
      const emailHash = md5(req.body.email.toLowerCase());
      const response = await mailchimp.lists.setListMember(
        process.env.MAILCHIMP_LIST_ID,
        emailHash,
        {
          email_address: req.body.email,
          merge_fields: {
            FNAME: req.body.firstName,
            LNAME: req.body.lastName,
            ADDRESS: {
              addr1: req.body.addr1,
              addr2: req.body.addr2,
              city: req.body.city,
              state: req.body.state,
              zip: req.body.zip,
              country: "US",
            },
          },
          interests: interests,
          status_if_new: "subscribed",
          tags: ["Buyer"],
        }
      );

      const now = new Date();
      const signup = new Date(response.timestamp_signup);
      const diff = now.getTime() - signup.getTime();

      //sign up time is less than a minute, meaning the person is a new member
      buyer.isNewsletterNew = diff < 60000;
    } catch (e) {
      console.log(e);
      const status = e.status;
      const mailchimpError = JSON.parse(e.response.text);
      res.status(status).send(mailchimpError.detail);
      return;
    }

    const awsCred = new AWS.Credentials({
      accessKeyId: process.env.EMAIL_AWS_ACCESS_KEY,
      secretAccessKey: process.env.EMAIL_AWS_SECRET_KEY,
    });

    const awsConfig = new AWS.Config({
      credentials: awsCred,
      region: process.env.EMAIL_AWS_REGION,
    });

    AWS.config.update(awsConfig);
    const emailDetails = {
      Destination: {
        ToAddresses: [process.env.TO_EMAIL],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: Object.keys(req.body)
              .map((item) => `<b>${item}:</b> ${req.body[item]}<br/>`)
              .join(""),
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: `${req.body.firstName} ${req.body.lastName} has ordered ${
            req.body.count
          } ${req.body.count > 1 ? "books" : "book"}`,
        },
      },
      Source: process.env.FROM_EMAIL,
    };

    const ses = new AWS.SES();
    let hasEmailError: boolean;
    ses.sendEmail(emailDetails, (error) => {
      hasEmailError = Boolean(error);
    });

    if (hasEmailError) {
      res
        .status(400)
        .send("Oops! Something went wrong. Please try again later.");
    } else {
      res.status(200).json(buyer);
    }
  } else {
    res.status(405).end();
  }
}
