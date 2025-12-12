import styles from "../page.module.css"
import React, {useState} from "react";
import { createPaymentCard } from "@/app/api/card/route"

export default function CreatePaymentCard() {
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');

    const handleExpiryChange = (e) => {
        const rawValue = e.target.value;

        let digits = rawValue.replace(/\D/g, '');

        digits = digits.substring(0, 4);

        let formattedValue = digits;

        if (digits.length > 2) {
            formattedValue = `${digits.slice(0, 2)} / ${digits.slice(2)}`;
        }

        setExpiryDate(formattedValue);
    };

    const handleCvcChange = (e) => {
        const rawValue = e.target.value;
        const digits = rawValue.replace(/\D/g, '');
        setCvc(digits);
    }

    return (
        <form className={styles.paymentCardForm} action={createPaymentCard}>
            <div className={styles.createInputsContainer}>
                <h2>Payment Card</h2>
                <div className={styles.createInput}>
                    <label htmlFor="cardNumberInput">Card Number</label>
                    <input id={"cardNumberInput"} name={"cardNumber"} type={"text"} placeholder={"Card Number"} />
                </div>
                <div className={styles.createInput}>
                    <label htmlFor="expirationInput">Expiration Date</label>
                    <input id={"expirationInput"} name={"expiryDate"} type={"text"} placeholder={"MM / YY"} maxLength={"7"} value={expiryDate} onChange={(e) => handleExpiryChange(e)} />
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