import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { mockUsers } from "@/lib/mockUsers";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase().trim();
        const password = credentials?.password ?? "";

        const user = mockUsers.find(
          (u) => u.email.toLowerCase() === email && u.password === password
        );

        if (!user) return null;

        return { id: user.id, name: user.name, email: user.email };
      }
    })
  ],
  pages: {
    signIn: "/signin"
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
