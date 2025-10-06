import styles from "./page.module.css"
import Image from "next/image"

export default function Card({ open, account }: { open: boolean, account: any }) {
    return (
        <div className={open ? styles.cardContainer : `${styles.cardContainer} ${styles.open}`}>
            <div className={styles.cardHeader}>
                <div className={styles.cardIconContainer}>
                    <img src={"https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"} alt={"Google logo"} />
                </div>
                <div className={styles.headerButtons}>

                </div>
            </div>
            <div className={styles.infoContainer}>
                <h1>{account.name}</h1>
                <div className={styles.inputsContainer}>
                    <label htmlFor="emailInput">Login</label>
                    <input id={"emailInput"} value={account.email}/>
                </div>
                <div className={styles.inputsContainer}>
                    <label htmlFor="passwordInput">Password</label>
                    <input id={"passwordInput"} type={"password"} value={account.password}/>
                </div>
            </div>
        </div>
    )
}