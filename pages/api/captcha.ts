import type { NextApiRequest, NextApiResponse } from "next";
import { verify } from "hcaptcha";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    const token = req.body.token;
    const result = await verify(
      process.env.HCAPTCHA_SECRET_KEY,
      token,
      null,
      process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY
    );
    console.log(result);

    if (result.success) {
      res.status(200).end();
    } else {
      res.status(400).end();
    }
  } else {
    res.status(405).end();
  }
}
