import { NextApiRequest, NextApiResponse } from "next"
import NextAuth, { InitOptions } from "next-auth"

const options: InitOptions = {
  providers: [],
  database: {
    type: "mysql",
    host: process.env.DB_HOSTNAME,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
}

export default function Auth(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return NextAuth(req, res, options)
}
