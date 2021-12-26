import { NextApiRequest, NextApiResponse } from "next";
import Providers from "next-auth/providers";
import NextAuth, { InitOptions } from "next-auth";
import { getUserByCredentials } from "server/mysql/actions/user";

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
        const { email, password } = credentials;
        const user = await getUserByCredentials(email, password);

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  database: process.env.MONGODB_URL,
  session: {
    jwt: true,
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  pages: {
    signIn: "/login",
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
