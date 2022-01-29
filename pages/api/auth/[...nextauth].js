import NextAuth from "next-auth";
import RedditProvider from "next-auth/providers/reddit";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, token, user }) {
      console.log(session);
      session.user = user;
      return session;
    },
  },
  database: process.env.DATABASE_URL,
  debug: true,
});
