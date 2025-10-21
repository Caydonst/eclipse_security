"use client"
import styles from "./navbar.module.css"
import Link from "next/link"

export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.contentContainer}>
                <div className={styles.logoContainer}>
                    <h1>Eclipse</h1>
                </div>
                <div className={styles.buttons}>
                    <Link href={"/login"}>Log in</Link>
                    <Link href={"/signup"}>Sign up</Link>
                </div>
            </div>
        </div>
    )
}