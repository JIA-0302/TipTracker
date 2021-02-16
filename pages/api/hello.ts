// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

type HelloResponse = {
  text: string;
  content: string;
};

const handler: NextApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse<HelloResponse>
) => {
  res.status(200).json({
    text: "Hello There",
    content: "Welcome to TipTracker",
  });
};

export default handler;
