import styles from "./page.module.css"
import Image from "next/image"
import {XMarkIcon} from "@heroicons/react/24/outline"

export default function Card({ open, setOpen, account, setIsSelected }: { open: boolean, setOpen: any, account: any, setIsSelected: any }) {

    const changeStates = () => {
        setOpen(false);
        setIsSelected(-1);
    }

    return (
        <div className={open ? styles.cardContainer : `${styles.cardContainer} ${styles.open}`}>
            <div className={styles.cardHeader}>
                <div className={styles.cardIconContainer}>
                    <img src={"https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"} alt={"Google logo"} />
                </div>
                <div className={styles.headerButtons}>
                    <button className={styles.closeBtn} onClick={() => changeStates()}><XMarkIcon className={styles.closeIcon} /></button>
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