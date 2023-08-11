import logger from "@/utils/logger";
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const nextAuthUrl = process.env.NEXTAUTH_URL;

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  debug: false,
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch(`${nextAuthUrl}/api/user`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json()

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  session: {
    maxAge: 7 * 24 * 60 * 60
  },
  //pages: {
  //  signIn: '/auth/signin',
  //  //signOut: '/auth/signout',
  //  //error: '/auth/error', // Error code passed in query string as ?error=
  //  verifyRequest: '/auth/verify-request', // (used for check email message)
  //  //newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  //}
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) { return true },
    // async redirect({ url, baseUrl }) { return baseUrl },
    async session({ session, user, token }) {
      if(session?.user) {
        session.user.id = token.sub || '';
      }
      return session
    },
    // async jwt({ token, user, account, profile, isNewUser }) { return token }
  },
  logger: {
    error(code, metadata) { logger.error(metadata, code); },
    warn(code) { logger.warn(code); },
    debug(code, metadata) { logger.debug(metadata, code); }
  },
  theme: {
    colorScheme: "dark", // "auto" | "dark" | "light"
    brandColor: "", // Hex color code
    logo: "", // Absolute URL to image
    buttonText: "" // Hex color code
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
