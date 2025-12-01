import styles from "./page.module.css"
import React, {useState} from "react";
import {
    BuildingLibraryIcon as BuildingLibrarySolid,
    CreditCardIcon as CreditCardSolid,
    LockClosedIcon as LockClosedSolid
} from "@heroicons/react/24/solid";
import {XMarkIcon} from "@heroicons/react/24/outline";

type props = {
    changeStates: () => void;
}

export default function CreateCardInfo({ changeStates }: props) {
    const [cardType, setCardType] = useState("");
    const [selectedType, setSelectedType] = useState("password");


    return (
        <>
            <div className={styles.cardHeader}>
                <div className={styles.cardIconContainer}>
                    {selectedType === "password" &&
                        <LockClosedSolid className={styles.lockLogo} />
                    }
                    {selectedType === "paymentCard" &&
                        <CreditCardSolid className={styles.cardLogo} />
                    }
                    {selectedType === "bankAccount" &&
                        <BuildingLibrarySolid className={styles.bankLogo} />
                    }
                </div>
                <div className={styles.headerButtons}>
                    <button className={styles.closeBtn} onClick={() => changeStates()}><XMarkIcon className={styles.closeIcon} /></button>
                </div>
            </div>
            <div className={styles.infoContainer}>
                <h1>Create New</h1>
                <div className={styles.selectorContainer}>
                    <button
                        className={`${styles.selectorBtnPassword} ${selectedType === "password" ? styles.selected : ""}`}
                        onClick={() => setSelectedType("password")}
                    >
                        <LockClosedSolid className={styles.lockLogo} />
                    </button>
                    <button
                        className={`${styles.selectorBtnCard} ${selectedType === "paymentCard" ? styles.selected : ""}`}
                        onClick={() => setSelectedType("paymentCard")}
                    >
                        <CreditCardSolid className={styles.cardLogo} />
                    </button>
                    <button
                        className={`${styles.selectorBtnBank} ${selectedType === "bankAccount" ? styles.selected : ""}`}
                        onClick={() => setSelectedType("bankAccount")}
                    >
                        <BuildingLibrarySolid className={styles.bankLogo} />
                    </button>
                </div>
                {selectedType === "password" && (
                    <div className={styles.createInputsContainer}>
                        <h2>Password</h2>
                        <div className={styles.createInput}>
                            <label htmlFor="loginInput">Login</label>
                            <input id={"loginInput"} type={"text"} placeholder={"Username/Email"} />
                        </div>
                        <div className={styles.createInput}>
                            <label htmlFor="passwordInput">Password</label>
                            <input id={"passwordInput"} type={"text"} placeholder={"Password"} />
                        </div>
                        <button className={styles.createBtn}>Create</button>
                        <div className={styles.footerColor} style={{backgroundColor: '#FF4654'}}></div>
                    </div>
                )}
                {selectedType === "paymentCard" && (
                    <div className={styles.createInputsContainer}>
                        <h2>Payment Card</h2>
                        <div className={styles.createInput}>
                            <label htmlFor="cardNumberInput">Card Number</label>
                            <input id={"cardNumberInput"} type={"text"} placeholder={"Card Number"} />
                        </div>
                        <div className={styles.createInput}>
                            <label htmlFor="expirationInput">Expiration Date</label>
                            <input id={"expirationInput"} type={"text"} placeholder={"MM/YY"} />
                        </div>
                        <div className={styles.createInput}>
                            <label htmlFor="cvcInput">CVC</label>
                            <input id={"cvcInput"} type={"text"} placeholder={"CVC"} />
                        </div>
                        <button className={styles.createBtn}>Create</button>
                        <div className={styles.footerColor} style={{backgroundColor: '#FF3AAD'}}></div>
                    </div>
                )}
                {selectedType === "bankAccount" && (
                    <div className={styles.createInputsContainer}>
                        <h2>Bank Account</h2>
                        <div className={styles.createInput}>
                            <label htmlFor="routingNumberInput">Routing Number</label>
                            <input id={"routingNumberInput"} type={"text"} placeholder={"Routing Number"} />
                        </div>
                        <div className={styles.createInput}>
                            <label htmlFor="accountNumberInput">Account Number</label>
                            <input id={"accountNumberInput"} type={"text"} placeholder={"Account Number"} />
                        </div>
                        <button className={styles.createBtn}>Create</button>
                        <div className={styles.footerColor} style={{backgroundColor: '#3FC5FF'}}></div>
                    </div>
                )}
            </div>
        </>
    )
}