"use client"
import {signOut} from "next-auth/react";
import styles from "@/app/vault/page.module.css";

export default function LogoutBtn() {
    return (
        <button className={styles.logoutBtn} onClick={() => signOut()}>Sign out</button>
    )
}