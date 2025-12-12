import styles from "../page.module.css"
import React from "react";

export default function CreateBankAccount() {
    return (
        <div className={styles.createInputsContainer}>
            <h2>Bank Account</h2>
            <div className={styles.createInput}>
                <label htmlFor="routingNumberInput">Routing Number</label>
                <input id={"routingNumberInput"} name={"routingNumber"} type={"text"} placeholder={"Routing Number"} />
            </div>
            <div className={styles.createInput}>
                <label htmlFor="accountNumberInput">Account Number</label>
                <input id={"accountNumberInput"} name={"accountNumber"} type={"text"} placeholder={"Account Number"} />
            </div>
            <div className={styles.createBtnContainer}>
                <button className={styles.createBtn}>Create</button>
                <p className={styles.encryptTag}>All information is encrypted.</p>
            </div>
            <div className={styles.footerColor} style={{backgroundColor: '#3FC5FF'}}></div>
        </div>
    )
}