"use client"
import {signOut} from "next-auth/react";
import styles from "@/app/vault/page.module.css";
import React, {useState} from "react";

export default function ProfileCard() {
    const [loading, setLoading] = useState(false);

    const logOut = async () => {
        setLoading(true);
        await signOut();
    };

    return (
        <button className={styles.profileCard} onClick={logOut} disabled={loading}>
            {loading ? (
                <div className={styles.dotLoader}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                </div>
            ) : (
                <div className={styles.profileCardInner}>
                    <div className={styles.profileImg}></div>
                    <p>testemail1234567890@gmail.com</p>
                </div>
            )}
        </button>
    )
}