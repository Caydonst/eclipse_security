"use client"
import {signOut} from "next-auth/react";
import styles from "@/app/vault/page.module.css";
import React, {useState} from "react";

export default function ProfileCard({handleBtnClick}: {handleBtnClick: any}) {
    return (
        <button className={styles.profileCard} onClick={() => handleBtnClick("profile")}>
            <div className={styles.profileCardInner}>
                <div className={styles.profileImg}></div>
                <p>testemail1234567890@gmail.com</p>
            </div>
        </button>
    )
}