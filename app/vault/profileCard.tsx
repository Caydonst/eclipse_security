"use client"
import {signOut} from "next-auth/react";
import styles from "@/app/vault/page.module.css";
import React, {useState} from "react";

interface User {
    id: string;
    name: string;
    email: string;
    image: string;
}

export default function ProfileCard({user}: {user: User}) {
    console.log(user.name);
    console.log(user.image);
    return (
        <>
            <button className={styles.profileCard}>
                <div className={styles.profileCardInner}>
                    <div className={styles.profileImgContainer}>
                        <img className={styles.profileImg} src={user.image} />
                    </div>
                    <p>{user.email}</p>
                </div>
            </button>
            <button className={styles.profileCardSmall}>
                <div className={styles.profileImgContainer}>
                    <img className={styles.profileImg} src={user.image} />
                </div>
            </button>
        </>
    )
}