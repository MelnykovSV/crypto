import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { User } from "@/models";
import connectDB from "@/app/lib/dbConnect";
import { NextAuthOptions } from "next-auth";

interface IUser {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  phone?: string | null | undefined;
  avatar?: string | null | undefined;
  birthday?: Date | null | undefined;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        name: { label: "name", type: "text" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials?.email });

        if (!user) {
          return null;
        }

        const passwordCorrect = await compare(
          credentials?.password || "",
          user.password
        );

        if (passwordCorrect) {
          return {
            id: user._id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            birthday: user.birthday,
            avatar: user.avatar as any,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }: any) {
      if (trigger === "update" && session) {
        return { ...token, ...session };
      }

      return user
        ? {
            ...token,
            id: user.id,
            phone: user.phone,
            birthday: user.birthday,
            avatar: user.avatar,
          }
        : token;
    },
    async session({ session, token, user }) {
      // Note that this if condition is needed
      // if (session.user) {
      session.user = {
        ...session.user,
        email: token.email,
        name: token.name,
        id: token.id,
        phone: token.phone,
        birthday: token.birthday,
        avatar: token.avatar,
      } as IUser;
      // }

      return session;
    },
  },
};
