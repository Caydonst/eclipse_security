import styles from "./page.module.css"
import Image from "next/image"
import {XMarkIcon, EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline"
import React, {useState, useEffect} from "react";
import {
    BuildingLibraryIcon as BuildingLibrarySolid,
    CreditCardIcon as CreditCardSolid,
    LockClosedIcon as LockClosedSolid
} from "@heroicons/react/24/solid";
import PasswordInfo from "./PasswordInfo"
import PaymentCardInfo from "./PaymentCardInfo";
import BankAccountInfo from "./BankAccountInfo";
import CreateCardInfo from "./CreateCardInfo";

interface Account {
    id: number;
    type: string;
    name: string;
    email: string;
    password: string;
}

type props = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    account: Account
    setSelectedCell: React.Dispatch<React.SetStateAction<number | null>>;
    copiedAnimation: boolean
    setCopiedAnimation: React.Dispatch<React.SetStateAction<boolean>>;
    selectedAccountIndex: number | null
}

export default function Card({ open, setOpen, account, setSelectedCell, copiedAnimation, setCopiedAnimation, selectedAccountIndex }: props) {
    const [showPassword, setShowPassword] = useState(false);


    const changeStates = () => {
        setOpen(false);
        setSelectedCell(-1);
        setCopiedAnimation(false);
        document.body.classList.remove("no-scroll");
    }

    const copyToClipboard = async (text: string) => {
        if (navigator.clipboard && window.isSecureContext) {
            // Use the modern clipboard API if available
            try {
                await navigator.clipboard.writeText(text);
                triggerAnimation();
                return;
            } catch (err) {
                console.log("Clipboard API failed, falling back:", err);
            }
        }

        // ✅ Fallback for Safari and older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.top = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand("copy");
            triggerAnimation();
        } catch (err) {
            console.log("Fallback copy failed:", err);
        } finally {
            document.body.removeChild(textArea);
        }
    };

    const triggerAnimation = () => {
        setCopiedAnimation(false);
        setTimeout(() => setCopiedAnimation(true), 10); // restart animation
    };

    useEffect(() => {
        setShowPassword(false);
    }, [open])

    return (
        <div className={open ? styles.cardContainer : `${styles.cardContainer} ${styles.open}`}>
            {selectedAccountIndex !== null && selectedAccountIndex >= 0 &&
                <>
                    <div className={styles.cardHeader}>
                        <div className={styles.cardIconContainer}>
                            {account.type === "password" &&
                                <LockClosedSolid className={styles.lockLogo} />
                            }
                            {account.type === "paymentCard" &&
                                <CreditCardSolid className={styles.cardLogo} />
                            }
                            {account.type === "bankAccount" &&
                                <BuildingLibrarySolid className={styles.bankLogo} />
                            }
                        </div>
                        <div className={styles.headerButtons}>
                            <button className={styles.closeBtn} onClick={() => changeStates()}><XMarkIcon className={styles.closeIcon} /></button>
                        </div>
                    </div>
                    {account.type === "password" && (
                        <PasswordInfo account={account} copyToClipboard={copyToClipboard} open={open} />
                    )}
                    {account.type === "paymentCard" && (
                        <PaymentCardInfo account={account} copyToClipboard={copyToClipboard} open={open} />
                    )}
                    {account.type === "bankAccount" && (
                        <BankAccountInfo account={account} copyToClipboard={copyToClipboard} open={open} />
                    )}
                    <div className={`${styles.passwordCopiedMessage} ${copiedAnimation ? styles.animate : ""}`}>
                        <p>Password Copied</p>
                    </div>
                </>
            }
            {selectedAccountIndex !== null && selectedAccountIndex === -1 &&
                <CreateCardInfo changeStates={changeStates} triggerAnimation={triggerAnimation} />
            }
        </div>
    )
}