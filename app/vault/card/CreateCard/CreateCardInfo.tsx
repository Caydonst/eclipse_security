import styles from "../page.module.css"
import React, {useState} from "react";
import {
    BuildingLibraryIcon as BuildingLibrarySolid,
    CreditCardIcon as CreditCardSolid,
    LockClosedIcon as LockClosedSolid
} from "@heroicons/react/24/solid";
import {XMarkIcon} from "@heroicons/react/24/outline";
import CreateLogin from "./CreateLogin";
import CreatePaymentCard from "./CreatePaymentCard";
import CreateBankAccount from "./CreateBankAccount";
import {Account} from "@/app/api/vault/vaultItems"

type props = {
    changeStates: () => void;
    setVaultItems: React.Dispatch<React.SetStateAction<Account>>;
}

export default function CreateCardInfo({ changeStates, setVaultItems }: props) {
    const [cardType, setCardType] = useState("");
    const [selectedType, setSelectedType] = useState("login");


    return (
        <>
            <div className={styles.cardHeader}>
                <div className={styles.cardIconContainer}>
                    {selectedType === "login" &&
                        <div className={styles.lockLogoContainer}>
                            <LockClosedSolid className={styles.lockLogo}/>
                        </div>
                    }
                    {selectedType === "paymentCard" &&
                        <div className={styles.cardLogoContainer}>
                            <CreditCardSolid className={styles.cardLogo}/>
                        </div>
                    }
                    {selectedType === "bankAccount" &&
                        <div className={styles.bankLogoContainer}>
                            <BuildingLibrarySolid className={styles.bankLogo}/>
                        </div>
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
                        className={`${styles.selectorBtnPassword} ${selectedType === "login" ? styles.selected : ""}`}
                        onClick={() => setSelectedType("login")}
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
                {selectedType === "login" && (
                    <CreateLogin setVaultItems={setVaultItems} />
                )}
                {selectedType === "paymentCard" && (
                    <CreatePaymentCard setVaultItems={setVaultItems} />
                )}
                {selectedType === "bankAccount" && (
                    <CreateBankAccount setVaultItems={setVaultItems} />
                )}
            </div>
        </>
    )
}