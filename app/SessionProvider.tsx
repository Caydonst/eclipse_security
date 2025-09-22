"use client"; // must be a client component
import { SessionProvider } from "next-auth/react";

export function ClientSessionProvider({ children }: { children: React.ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>;
}
