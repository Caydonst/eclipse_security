import styles from "./page.module.css"
import React from "react";


export default function LogoutBtn({handleLogout, loading}: {handleLogout: () => void, loading: boolean}) {
    return (
        <button className={styles.logoutBtn} onClick={() => handleLogout()}  disabled={loading}>
            {loading ? (
                <div className={styles.dotLoader}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                </div>
            ) : (
                <p>Logout</p>
            )}
        </button>
    )
}