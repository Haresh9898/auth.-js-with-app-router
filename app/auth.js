import authConfig from "@/auth.config";
import { connectToDb, getUserById, saltAndHashPassword } from "@/lib/utils";
import User from "@/models/User";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import { saltAndHashPassword } from "@/utils/password";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        let message = "";
        if (!email || !password) {
          message = "All fields are required";
          throw new CredentialsSignin(message);
        }
        await connectToDb();
        let user = await User.findOne({ email }).select("+password");
        if (!user) {
          message = "User not found";
          throw new CredentialsSignin(message);
        }
        if (!user.password) {
          message = "Invalid Email or Password";
          throw new CredentialsSignin(message);
        }
        const pwHash = await saltAndHashPassword(
          credentials.password,
          user.password
        );
        if (!pwHash) {
          message = "Invalid Email or Password";
          throw new CredentialsSignin(message);
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      if (token.sub) {
        const user = await getUserById(token.sub);
        if (!user) return token;
        token.role = user?.role;
      }
      token.exp = Math.round(Date.now() / 1000) + 3600 + 10 * 60 * 60;
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
});
