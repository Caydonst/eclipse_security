"use client"
import {signOut} from "next-auth/react";
import styles from "@/app/vault/page.module.css";
import React, {useState} from "react";

export default function LogoutBtn() {
    const [loading, setLoading] = useState(false);

    const logOut = async () => {
        setLoading(true);
        await signOut();
    };

    return (
        <button className={styles.logoutBtn} onClick={logOut} disabled={loading}>
            {loading ? (
                <div className={styles.dotLoader}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                </div>
            ) : (
                "Logout"
            )}
        </button>
    )
}