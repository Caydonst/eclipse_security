import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "@/app/users"

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
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                // Lookup user in your DB
                const user = users.find(
                    user => user.email === credentials.email
                );

                if (!user) return null;

                // Verify password
                const isValid = user.password === credentials.password;
                if (!isValid) return null;

                // Return a user object → becomes part of the JWT/session
                return { id: user.id, email: user.email };
            },
        }),
    ],
    session: {
        strategy: "jwt", // session stored in a secure JWT
    },
    callbacks: {
        async jwt({ token, account, profile, user }) {
            // When logging in with Google
            if (account && profile) {
                token.userId = profile.sub;
                token.name = profile.name;
                token.email = profile.email;
                token.picture = upgradeGoogleImage(profile.picture, 512);
            }

            // When logging in with credentials
            if (user) {
                token.userId = user.id;
                token.email = user.email;
            }

            return token;
        },

        async session({ session, token }) {
            if (!session.user) session.user = {} as any;

            session.user.id = token.userId as string;
            session.user.name = token.name as string;
            session.user.email = token.email as string;
            session.user.image = upgradeGoogleImage(token.picture, 512);
            return session;
        },
    },
    pages: {
        signIn: "/vault",
        error: "/login",
    },
};

function upgradeGoogleImage(url: string, size: number = 512) {
    if (!url) return url;

    // Replace =sXX-c at the end
    return url.replace(/=s\d+-c$/, `=s${size}-c`);
}

// @ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
