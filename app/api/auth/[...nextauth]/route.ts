import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const authOptions = NextAuth({
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      // @ts-ignore
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        if (!credentials) {
          throw new Error("Credentials are undefined")
        }
        console.log('Implement connection with db');
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : ''
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID ? process.env.GITHUB_ID : '',
      clientSecret: process.env.GITHUB_SECRET ? process.env.GITHUB_SECRET : ''
    })
  ],
  callbacks: {
    async jwt(params: any) {
      if (params) {
        console.log('DO something');
      }
      return params.token;
    },
    session({ session, token }) {
      if (session.user) {
        console.log('DO something');
      }
      return session
    },
    async signIn({ account, profile }) {
      if (account?.provider === "google" || account?.provider === 'github') {
        console.log('DO something');
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 3600 * 1000,  //one week
  },
  pages: {
    signIn: '/', //custom login page 
  },
});


export { authOptions as GET, authOptions as POST };
