import styles from "./page.module.css"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { signOut } from "next-auth/react";
import LogoutBtn from "./LogoutBtn"
import { redirect } from "next/navigation"

export default async function VaultPage() {
    // @ts-ignore
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    // Load vault items where ownerId = session.user.id
    return (
        <div className={styles.vaultPage}>
            <div className={styles.profileContainer}>
                <h1>{session.user.name}'s Vault</h1>
                {/* render items */}
                <LogoutBtn />
            </div>
        </div>
    );
}
