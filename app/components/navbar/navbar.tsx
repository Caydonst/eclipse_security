"use client"
import styles from "./navbar.module.css"

export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.contentContainer}>
                <div className={styles.logoContainer}>
                    <p>Eclipse</p>
                    <p>Security</p>
                </div>
            </div>
        </div>
    )
}