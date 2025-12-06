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

type props = {
    user: User;
    setProfileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileCard({user, setProfileMenuOpen}: props) {

    return (
        <>
            <button className={styles.profileCard} onClick={() => setProfileMenuOpen(true)}>
                <div className={styles.profileImgContainer}>
                    {user.image && (
                        <img className={styles.profileImg} src={user.image} />
                    )}
                </div>
                <p>{user.name}</p>
            </button>
            <button className={styles.profileCardSmall} onClick={() => setProfileMenuOpen(true)}>
                <div className={styles.profileImgContainer}>
                    {user.image && (
                        <img className={styles.profileImg} src={user.image} />
                    )}
                </div>
            </button>
        </>
    )
}