import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import vendorModel from "@/model/vendor-model";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        try {
          const user = await vendorModel.findOne({
            email: credentials.email,
          });
          if (!user) {
            throw new Error("No user found with this email");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your account");
          }
          if (!user.isAdmin) {
            throw new Error(
              "You have not been verified as a vendor by the admin yet.Please try again later after some time."
            );
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Email or Password incorrect");
          }
        } catch (err) {
          throw new Error(err.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAdmin = user.isAdmin;
        token.email = user.email;
        token.firstName = user.firstName ;
        token.lastName = user.lastName ;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAdmin = token.isAdmin;
        session.user.email = token.email;
        session.user.firstName = token.firstName || "";
        session.user.lastName = token.lastName || "";
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
