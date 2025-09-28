import styles from "./page.module.css"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { signOut } from "next-auth/react";
import LogoutBtn from "./LogoutBtn"
import { redirect } from "next/navigation"
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {BuildingLibraryIcon} from "@heroicons/react/24/outline";
import {CreditCardIcon} from "@heroicons/react/24/outline";
import {LockClosedIcon} from "@heroicons/react/24/outline";
import {ListBulletIcon} from "@heroicons/react/24/outline";

export default async function VaultPage() {
    // @ts-ignore
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    // Load vault items where ownerId = session.user.id
    return (
        <div className={styles.vaultPage}>
            <div className={styles.topBar}>
                <div className={styles.logoContainer}>
                    <h1>Eclipse</h1>
                </div>
                <div className={styles.searchContainer}>
                    <MagnifyingGlassIcon className={styles.searchIcon}/>
                    <input className={styles.searchInput} type={"text"} placeholder={"Search my vault"} />
                </div>
            </div>
            <div className={styles.sideBar}>
                <button className={styles.sideBarButton}><ListBulletIcon className={styles.sideBarIcon}/>All Items</button>
                <button className={styles.sideBarButton}><LockClosedIcon className={styles.sideBarIcon}/>Passwords</button>
                <button className={styles.sideBarButton}><CreditCardIcon className={styles.sideBarIcon}/>Payment Cards</button>
                <button className={styles.sideBarButton}><BuildingLibraryIcon className={styles.sideBarIcon}/>Bank Accounts</button>
                <LogoutBtn />
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.cell}></div>
                <div className={styles.cell}></div>
                <div className={styles.cell}></div>
                <div className={styles.cell}></div>
                <div className={styles.cell}></div>
                <div className={styles.cell}></div>
                <div className={styles.cell}></div>
                <div className={styles.cell}></div>
                <div className={styles.cell}></div>
                <div className={styles.cell}></div>
                <div className={styles.cell}></div>
                <div className={styles.cell}></div>
            </div>
        </div>
    );
}
