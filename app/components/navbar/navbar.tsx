"use client"
import styles from "./navbar.module.css"

export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.contentContainer}>
                <div className={styles.logoContainer}>
                    <h1>Eclipse</h1>
                </div>
                <div className={styles.buttons}>
                    <button>Log in</button>
                    <button>Sign up</button>
                </div>
            </div>
        </div>
    )
}