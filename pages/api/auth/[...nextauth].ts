import { NextApiRequest, NextApiResponse } from "next";
import Providers from "next-auth/providers";
import NextAuth, { InitOptions } from "next-auth";

const options: InitOptions = {
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "testuser@tiptracker.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email } = credentials;
        // TODO - Add logic to retrieve user based on credentials
        const user = { id: 1, name: "Signed Test User", email: email };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  database: {
    type: "mysql",
    host: process.env.DB_HOSTNAME,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  session: {
    jwt: true,
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  pages: {
    //signIn: '/api/auth/signin',
    //signOut: '/api/auth/signout',
    //error: '/api/auth/error', // Error code passed in query string as ?error=
    //verifyRequest: '/api/auth/verify-request', // (used for check email message)
    //newUser: null // If set, new users will be directed here on first sign in
  },
};

export default function Auth(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return NextAuth(req, res, options);
}
