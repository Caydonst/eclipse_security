import styles from "../page.module.css"
import React, {useState} from "react";
import {
    BuildingLibraryIcon as BuildingLibrarySolid,
    CreditCardIcon as CreditCardSolid,
    LockClosedIcon as LockClosedSolid
} from "@heroicons/react/24/solid";
import {XMarkIcon} from "@heroicons/react/24/outline";
import CreatePassword from "./CreatePassword";
import CreatePaymentCard from "./CreatePaymentCard";
import CreateBankAccount from "./CreateBankAccount";

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
                    <CreatePassword />
                )}
                {selectedType === "paymentCard" && (
                    <CreatePaymentCard />
                )}
                {selectedType === "bankAccount" && (
                    <CreateBankAccount />
                )}
            </div>
        </>
    )
}