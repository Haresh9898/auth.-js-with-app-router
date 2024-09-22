import authConfig from "@/auth.config";
import { connectToDb, getUserById, saltAndHashPassword } from "@/lib/utils";
import User from "@/models/User";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import { saltAndHashPassword } from "@/utils/password";
import GitHub from "next-auth/providers/github";

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
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      profile: async (profile) => {
        return {
          name: profile.name || profile?.login,
          email: profile.email,
          githubId: String(profile.id),
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectToDb();
      if (account.provider === "github") {
        console.log("profile.id======", profile.id);
        let existingUser =
          profile.id && (await User.findOne({ githubId: profile.id }));
        if (!existingUser) {
          existingUser = await User.create({
            name: profile?.name || profile?.login,
            email: profile.email,
            githubId: String(profile.id),
          });
          user.id = existingUser._id.toString();
          return true;
        } else {
          user.id = existingUser?._id.toString();
          return true;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
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

    // NOTE : will create new page for error handling related to auth
    error: "/login", 
  },
});
