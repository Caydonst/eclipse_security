import styles from "../page.module.css"
import React, {useState} from "react";
import {createBankAccount} from "@/app/api/card/route";
import {Account} from "@/app/api/vault/vaultItems";

type props = {
    setVaultItems: React.Dispatch<React.SetStateAction<Account>>
}

export default function CreateBankAccount({ setVaultItems }: props) {
    const [name, setName] = useState("")
    const [routingNumber, setRoutingNumber] = useState('');
    const [accountNumber, setAccountNumber] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleRoutingNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const digits = rawValue.replace(/\D/g, '');
        setRoutingNumber(digits);
    };

    const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const digits = rawValue.replace(/\D/g, '');
        setAccountNumber(digits);
    }

    function newBankAccount(formData: FormData) {
        const items = createBankAccount(formData)
        setVaultItems(items);
    }

    return (
        <form className={styles.bankAccountForm} action={newBankAccount}>
            <div className={styles.createInputsContainer}>
                <h2>Bank Account</h2>
                <div className={styles.createInput}>
                    <label htmlFor={"nameInput"}>Name</label>
                    <input id={"nameInput"} name={"name"} placeholder={"Name"} type={"text"} maxLength={"255"} value={name} onChange={(e) => handleNameChange(e)} />
                </div>
                <hr/>
                <div className={styles.createInput}>
                    <label htmlFor="routingNumberInput">Routing Number</label>
                    <input id={"routingNumberInput"} name={"routingNumber"} type={"text"} placeholder={"Routing Number"} maxLength={"255"} value={routingNumber} onChange={(e) => handleRoutingNumberChange(e)} />
                </div>
                <div className={styles.createInput}>
                    <label htmlFor="accountNumberInput">Account Number</label>
                    <input id={"accountNumberInput"} name={"accountNumber"} type={"text"} placeholder={"Account Number"} maxLength={"255"} value={accountNumber} onChange={(e) => handleAccountNumberChange(e)} />
                </div>
                <div className={styles.createBtnContainer}>
                    <button className={styles.createBtn}>Create</button>
                    <p className={styles.encryptTag}>All information is encrypted.</p>
                </div>
                <div className={styles.footerColor} style={{backgroundColor: '#3FC5FF'}}></div>
            </div>
        </form>
    )
}