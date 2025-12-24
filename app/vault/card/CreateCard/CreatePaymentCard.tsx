import styles from "../page.module.css"
import React, {useEffect, useState} from "react";
import { createPaymentCard } from "@/app/api/card/route"
import {Account} from "@/app/api/vault/vaultItems"

type props = {
    setVaultItems: React.Dispatch<React.SetStateAction<Account>>
}

export default function CreatePaymentCard({ setVaultItems }: props) {
    const [expirationDate, setExpirationDate] = useState('');
    const [cvc, setCvc] = useState('');

    const handleExpiryChange = (e) => {
        const rawValue = e.target.value;

        let digits = rawValue.replace(/\D/g, '');

        digits = digits.substring(0, 4);

        let formattedValue = digits;

        if (digits.length > 2) {
            formattedValue = `${digits.slice(0, 2)} / ${digits.slice(2)}`;
        }

        setExpirationDate(formattedValue);
    };

    const handleCvcChange = (e) => {
        const rawValue = e.target.value;
        const digits = rawValue.replace(/\D/g, '');
        setCvc(digits);
    }

    function newPaymentCard(formData: FormData) {
        const items = createPaymentCard(formData)
        setVaultItems(items)
    }

    return (
        <form className={styles.paymentCardForm} action={newPaymentCard}>
            <div className={styles.createInputsContainer}>
                <h2>Payment Card</h2>
                <div className={styles.createInput}>
                    <label htmlFor="cardNumberInput">Card Number</label>
                    <input id={"cardNumberInput"} name={"cardNumber"} type={"text"} placeholder={"Card Number"} />
                </div>
                <div className={styles.createInput}>
                    <label htmlFor="expirationInput">Expiration Date</label>
                    <input id={"expirationInput"} name={"expirationDate"} type={"text"} placeholder={"MM / YY"} maxLength={"7"} value={expirationDate} onChange={(e) => handleExpiryChange(e)} />
                </div>
                <div className={styles.createInput}>
                    <label htmlFor="cvcInput">CVC</label>
                    <input id={"cvcInput"} name={"cvc"} type={"text"} placeholder={"CVC"} maxLength={"3"} value={cvc} onChange={(e) => handleCvcChange(e)} />
                </div>
                <div className={styles.createBtnContainer}>
                    <button className={styles.createBtn}>Create</button>
                    <p className={styles.encryptTag}>All information is encrypted.</p>
                </div>
                <div className={styles.footerColor} style={{backgroundColor: '#FF3AAD'}}></div>
            </div>
        </form>
    )
}