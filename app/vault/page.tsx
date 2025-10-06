// app/vault/page.tsx (Server Component by default)
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import VaultClient from "./VaultClient";
import {accounts} from "./passwords"


export default async function VaultPage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/login");
    }

    return <VaultClient accounts={accounts} />;
}
