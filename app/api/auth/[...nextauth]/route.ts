import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        userId?: string;
    }
}

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt", // session stored in a secure JWT
    },
    callbacks: {
        async redirect() {
            // Assume userId is in the JWT/session
            return "/vault";
        },
        async jwt({ token, account, profile }: { token: JWT; account: any; profile: any }) {
            if (profile) {
                token.userId = profile.sub; // Google user id
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token.userId) {
                session.user.id = token.userId;
            }
            return session;
        },
    },
};

// @ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
