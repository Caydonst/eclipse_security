import styles from "../page.module.css"
import React from "react";

export default function CreatePassword() {
    return (
        <div className={styles.createInputsContainer}>
            <h2>Password</h2>
            <div className={styles.createInput}>
                <label htmlFor="loginInput">Login</label>
                <input id={"loginInput"} name={"login"} type={"text"} placeholder={"Username/Email"} pattern={"[A-Za-z]+"} />
            </div>
            <div className={styles.createInput}>
                <label htmlFor="passwordInput">Password</label>
                <input id={"passwordInput"} name={"password"} type={"text"} placeholder={"Password"} />
            </div>
            <div className={styles.createBtnContainer}>
                <button className={styles.createBtn}>Create</button>
                <p className={styles.encryptTag}>All information is encrypted.</p>
            </div>
            <div className={styles.footerColor} style={{backgroundColor: '#FF4654'}}></div>
        </div>
    )
}